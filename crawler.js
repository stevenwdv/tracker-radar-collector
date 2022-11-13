/* eslint-disable max-lines */
const puppeteer = require('puppeteer');
const chalk = require('chalk').default;
const {createTimer} = require('./helpers/timer');
const wait = require('./helpers/wait');
const tldts = require('tldts');
const {performance} = require('perf_hooks');

const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36';
const MOBILE_USER_AGENT = 'Mozilla/5.0 (Linux; Android 10; Pixel 2 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Mobile Safari/537.36';

const DEFAULT_VIEWPORT = {
    width: 1440,//px
    height: 812//px
};
const MOBILE_VIEWPORT = {
    width: 412,
    height: 691,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
};

// for debugging: force to launch in window mode instead of headless, open devtools and don't close windows after process finishes
const VISUAL_DEBUG = false;

/**
 * @param {function(...any):void} log
 * @param {string} proxyHost
 * @param {string} executablePath path to chromium executable to use
 * @param {boolean} headed
 * @param {boolean} devtools
 */
function openBrowser(log, proxyHost, executablePath, headed = false, devtools = false) {
    /**
     * @type {import('puppeteer').BrowserLaunchArgumentOptions}
     */
    const args = {
        args: [
            // enable FLoC
            '--enable-blink-features=InterestCohortAPI',
            '--enable-features="FederatedLearningOfCohorts:update_interval/10s/minimum_history_domain_size_required/1,FlocIdSortingLshBasedComputation,InterestCohortFeaturePolicy"'
        ]
    };
    args.headless = !headed;
    args.devtools = devtools;

    if (proxyHost) {
        let url;
        try {
            url = new URL(proxyHost);
        } catch(e) {
            log('Invalid proxy URL');
            throw e;
        }

        args.args.push(`--proxy-server=${proxyHost}`);
        args.args.push(`--host-resolver-rules="MAP * ~NOTFOUND , EXCLUDE ${url.hostname}"`);
    }
    if (executablePath) {
        // @ts-ignore there is no single object that encapsulates properties of both BrowserLaunchArgumentOptions and LaunchOptions that are allowed here
        args.executablePath = executablePath;
    }

    return puppeteer.launch(args);
}

/**
 * @param {puppeteer.BrowserContext} context
 * @param {URL} url
 * @param {GetSiteDataOptions} data
 *
 * @returns {Promise<CollectResult>}
 */
async function getSiteData(context, url, {
    collectors,
    log,
    urlFilter,
    emulateUserAgent,
    emulateMobile,
    runInEveryFrame,
    maxLoadTimeMs,
    extraExecutionTimeMs,
    collectorFlags,
    keepOpen,
    onStart,
    onError,
    onHttpError,
}) {
    const testStarted = Date.now();
    if (onStart) {
        onStart(testStarted);
    }

    /**
     * @type {{cdpClient: import('puppeteer').CDPSession, type: string, url: string}[]}
     */
    const targets = [];

    const collectorOptions = {
        context,
        url,
        log,
        collectorFlags
    };

    for (let collector of collectors) {
        const timer = createTimer();

        try {
            // eslint-disable-next-line no-await-in-loop
            await collector.init(collectorOptions);
            log(`${collector.id()} init took ${timer.getElapsedTime()}s`);
        } catch (e) {
            if (onError) {
                onError(e, 'init failed', collector);
            } else {
                log(chalk.yellow(`${collector.id()} init failed`), e);
            }
        }
    }

    let pageTargetCreated = false;

    // initiate collectors for all contexts (main page, web worker, service worker etc.)
    context.on('targetcreated', async target => {
        // we have already initiated collectors for the main page, so we ignore the first page target
        if (target.type() === 'page' && !pageTargetCreated) {
            pageTargetCreated = true;
            return;
        }

        const timer = createTimer();
        let cdpClient = null;

        try {
            cdpClient = await target.createCDPSession();
        } catch (e) {
            if (onError) {
                onError(e, `failed to connect to ${target.type()} "${target.url()}"`);
            } else {
                log(chalk.yellow(`Failed to connect to ${target.type()} "${target.url()}"`), e);
            }
            return;
        }

        const simpleTarget = {url: target.url(), type: target.type(), cdpClient};
        targets.push(simpleTarget);

        for (let collector of collectors) {
            try {
                // eslint-disable-next-line no-await-in-loop
                await collector.addTarget(simpleTarget);
            } catch (e) {
                if (onError) {
                    onError(e, `failed to attach to ${target.type()} "${target.url()}"`, collector);
                } else {
                    log(chalk.yellow(`${collector.id()} failed to attach to ${target.type()} "${target.url()}"`), e);
                }
            }
        }

        log(`${target.url()} (${target.type()}) context initiated in ${timer.getElapsedTime()}s`);
    });

    // Create a new page in a pristine context.
    const page = await context.newPage();

    // optional function that should be run on every page (and subframe) in the browser context
    if (runInEveryFrame) {
        await page.evaluateOnNewDocument(runInEveryFrame);
    }

    // We are creating CDP connection before page target is created, if we create it only after
    // new target is created we will miss some requests, API calls, etc.
    const cdpClient = await page.target().createCDPSession();

    const initPageTimer = createTimer();
    for (let collector of collectors) {
        try {
            // eslint-disable-next-line no-await-in-loop
            await collector.addTarget({url: url.toString(), type: 'page', cdpClient});
        } catch (e) {
            if (onError) {
                onError(e, `failed to attach to landing page "${url}"`, collector);
            } else {
                log(chalk.yellow(`${collector.id()} failed to attach to page "${url}"`), e);
            }
        }
    }
    log(`page context initiated in ${initPageTimer.getElapsedTime()}s`);

    if (emulateUserAgent) {
        await page.setUserAgent(emulateMobile ? MOBILE_USER_AGENT : DEFAULT_USER_AGENT);
    }

    await page.setViewport(emulateMobile ? MOBILE_VIEWPORT : DEFAULT_VIEWPORT);

    // if any prompts open on page load, they'll make the page hang unless closed
    page.on('dialog', dialog => dialog.dismiss());

    // catch and report crash errors
    page.on('error', e => {
        if (onError) {
            onError(e, `error in page ${page.url()}`);
        } else {
            log(chalk.red(`error in page ${page.url()}`, String(e)));
        }
    });

    let timeout = false;

    let httpStatusCode;
    const loadStart = performance.now();
    try {
        const response = await page.goto(url.toString(), {timeout: maxLoadTimeMs, waitUntil: 'networkidle0'});
        httpStatusCode = response.status();
        if (!response.ok()) {
            let doContinue;
            if (onHttpError) {
                doContinue = onHttpError(httpStatusCode);
            } else {
                doContinue = httpStatusCode !== 404 && httpStatusCode < 500;
                if (doContinue) {
                    log(chalk.yellow(`HTTP error ${httpStatusCode} ${response.statusText()} while loading ${page.url()}`));
                }
            }
            if (!doContinue) {
                throw new Error(`HTTP error ${httpStatusCode} ${response.statusText()} while loading ${page.url()}`);
            }
        }
    } catch (e) {
        if (e instanceof puppeteer.errors.TimeoutError || (e.name && e.name === 'TimeoutError')) {
            log(chalk.yellow('navigation timeout exceeded'));

            for (let target of targets) {
                if (target.type === 'page') {
                    // eslint-disable-next-line no-await-in-loop
                    await target.cdpClient.send('Page.stopLoading');
                }
            }
            timeout = true;
        } else {
            throw e;
        }
    }
    const pageLoadDurationMs = performance.now() - loadStart;

    // give website a bit more time for things to settle
    await page.waitForTimeout(extraExecutionTimeMs);

    const finalUrl = page.url();
    /**
     * @type {Object<string, Object>}
     */
    const data = {};

    for (let collector of collectors) {
        const getDataTimer = createTimer();
        try {
            // eslint-disable-next-line no-await-in-loop
            const collectorData = await collector.getData({
                finalUrl,
                urlFilter: urlFilter && urlFilter.bind(null, finalUrl),
                pageLoadDurationMs
            });
            data[collector.id()] = collectorData;
            log(`getting ${collector.id()} data took ${getDataTimer.getElapsedTime()}s`);
        } catch (e) {
            if (onError) {
                onError(e, 'getting data failed', collector);
            } else {
                log(chalk.yellow(`getting ${collector.id()} data failed`), e);
            }
            data[collector.id()] = null;
        }
    }

    for (let target of targets) {
        try {
            // eslint-disable-next-line no-await-in-loop
            await target.cdpClient.detach();
        } catch (ignore) {
            // we don't care that much because in most cases an error here means that target already detached
        }
    }

    if (!keepOpen) {
        await page.close();
    }

    return {
        initialUrl: url.toString(),
        finalUrl,
        timeout,
        httpStatusCode,
        testStarted,
        testFinished: Date.now(),
        data,
    };
}

/**
 * @param {string} documentUrl
 * @param {string} requestUrl
 * @returns {boolean}
 */
function isThirdPartyRequest(documentUrl, requestUrl) {
    const mainPageDomain = tldts.getDomain(documentUrl);

    return tldts.getDomain(requestUrl) !== mainPageDomain;
}

/**
 * @param {URL} url
 * @param {CrawlOptions} options
 * @returns {Promise<CollectResult>}
 */
async function crawl(url, options) {
    const log = options.log || (() => {});
    const browser = options.browserContext ? null : await openBrowser(
        log, options.proxyHost, options.executablePath,
        options.headed || VISUAL_DEBUG, options.devtools || VISUAL_DEBUG
    );
    // Create a new incognito browser context.
    const context = options.browserContext || await browser.createIncognitoBrowserContext();
    if (browser) {
        // Close non-incognito window
        context.once(
            'targetcreated',
            () => browser.defaultBrowserContext().pages().then(([p]) => p.close())
        );
    }

    let data = null;

    const maxLoadTimeMs = options.maxLoadTimeMs === undefined ? 30000 : options.maxLoadTimeMs;
    const extraExecutionTimeMs = options.extraExecutionTimeMs === undefined ? 2500 : options.extraExecutionTimeMs;
    const maxCollectionTimeMs = options.maxCollectionTimeMs === undefined ? 5000 : options.maxCollectionTimeMs;
    const maxTotalTimeMs = maxCollectionTimeMs ? (maxLoadTimeMs * 2) + extraExecutionTimeMs + maxCollectionTimeMs : 0;

    const keepOpen = options.keepOpen || VISUAL_DEBUG;

    try {
        data = await wait(getSiteData(context, url, {
            collectors: options.collectors || [],
            log,
            urlFilter: options.filterOutFirstParty === true ? isThirdPartyRequest.bind(null) : null,
            emulateUserAgent: options.emulateUserAgent !== false, // true by default
            emulateMobile: options.emulateMobile,
            runInEveryFrame: options.runInEveryFrame,
            maxLoadTimeMs,
            extraExecutionTimeMs,
            collectorFlags: options.collectorFlags,
            keepOpen,
            onStart: options.onStart,
            onError: options.onError,
            onHttpError: options.onHttpError,
        }), maxTotalTimeMs);
    } catch(e) {
        log(chalk.red('Crawl failed'), String(e));
        throw e;
    } finally {
        // only close the browser if it was created here and keepOpen is false
        if (browser && !keepOpen) {
            await context.close();
            await browser.close();
        }
    }

    return data;
}

module.exports = crawl;

/**
 * @typedef CrawlOptions
 * @property {import('./collectors/BaseCollector')[]} [collectors]
 * @property {function(...any):void} [log]
 * @property {boolean=} filterOutFirstParty
 * @property {boolean=} emulateMobile
 * @property {boolean=} emulateUserAgent
 * @property {string=} proxyHost
 * @property {puppeteer.BrowserContext=} browserContext
 * @property {function():void=} runInEveryFrame
 * @property {string=} executablePath
 * @property {number=} maxLoadTimeMs
 * @property {number=} extraExecutionTimeMs
 * @property {number=} maxCollectionTimeMs 0 to disable overall timeout
 * @property {Object.<string, string>=} collectorFlags
 * @property {boolean=} headed
 * @property {boolean=} devtools
 * @property {boolean=} keepOpen
 * @property {OnStart=} onStart Called with crawl start time
 * @property {OnError=} onError Called on non-fatal errors, disables logging of errors
 * @property {OnHttpError=} onHttpError Called on page load errors, return `false` to abort crawl,
 *      disables logging of such errors, when unspecified crawl is stopped on only some errors
 */

/**
 * @typedef GetSiteDataOptions
 * @property {import('./collectors/BaseCollector')[]} collectors
 * @property {function(...any):void} log
 * @property {function(string, string):boolean} urlFilter
 * @property {boolean} emulateMobile
 * @property {boolean} emulateUserAgent
 * @property {function():void} runInEveryFrame
 * @property {number} maxLoadTimeMs
 * @property {number} extraExecutionTimeMs
 * @property {Object.<string, string>} collectorFlags
 * @property {boolean} keepOpen
 * @property {OnStart=} onStart
 * @property {OnError=} onError
 * @property {OnHttpError=} onHttpError
 */

/**
 * @callback OnStart
 * @param {number} testStarted Time when the crawl started
 * @returns {void}
 */

/**
 * @callback OnError
 * @param {unknown} error Error that was thrown
 * @param {string} context Additional info
 * @param {import('./collectors/BaseCollector')=} collector Collector that threw the error
 * @returns {void}
 */

/**
 * @callback OnHttpError
 * @param {number} statusCode
 * @returns {boolean} Whether to continue, `false` to abort crawl
 */

/**
 * @typedef {Object} CollectResult
 * @property {string} initialUrl URL from which the crawler began the crawl (as provided by the caller)
 * @property {string} finalUrl URL after page has loaded (can be different from initialUrl if e.g. there was a redirect)
 * @property {boolean} timeout true if page didn't fully load before the timeout and loading had to be stopped by the crawler
 * @property {number=} httpStatusCode may be unset on timeout
 * @property {number} testStarted time when the crawl started (unix timestamp)
 * @property {number} testFinished time when the crawl finished (unix timestamp)
 * @property {import('./helpers/collectorsList').CollectorData} data object containing output from all collectors
*/
