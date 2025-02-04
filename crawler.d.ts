export = crawl;
/**
 * @param {URL} url
 * @param {CrawlOptions} options
 * @returns {Promise<CollectResult>}
 */
declare function crawl(url: URL, options: CrawlOptions): Promise<CollectResult>;
declare namespace crawl {
    export { CrawlOptions, GetSiteDataOptions, OnStart, OnError, OnHttpError, CollectResult };
}
type CrawlOptions = {
    collectors?: import('./collectors/BaseCollector')[];
    log?: (...args: any[]) => void;
    filterOutFirstParty?: boolean | undefined;
    emulateMobile?: boolean | undefined;
    emulateUserAgent?: boolean | undefined;
    proxyHost?: string | undefined;
    browserContext?: puppeteer.BrowserContext | undefined;
    runInEveryFrame?: (() => void) | undefined;
    executablePath?: string | undefined;
    maxLoadTimeMs?: number | undefined;
    extraExecutionTimeMs?: number | undefined;
    /**
     * 0 to disable overall timeout
     */
    maxCollectionTimeMs?: number | undefined;
    collectorFlags?: {
        [x: string]: string;
    } | undefined;
    headed?: boolean | undefined;
    devtools?: boolean | undefined;
    keepOpen?: boolean | undefined;
    /**
     * Called with crawl start time
     */
    onStart?: OnStart | undefined;
    /**
     * Called on non-fatal errors, disables logging of errors
     */
    onError?: OnError | undefined;
    /**
     * Called on page load errors, return `false` to abort crawl,
     * disables logging of such errors, when unspecified crawl is stopped on only some errors
     */
    onHttpError?: OnHttpError | undefined;
};
type CollectResult = {
    /**
     * URL from which the crawler began the crawl (as provided by the caller)
     */
    initialUrl: string;
    /**
     * URL after page has loaded (can be different from initialUrl if e.g. there was a redirect)
     */
    finalUrl: string;
    /**
     * true if page didn't fully load before the timeout and loading had to be stopped by the crawler
     */
    timeout: boolean;
    /**
     * may be unset on timeout
     */
    httpStatusCode?: number | undefined;
    /**
     * time when the crawl started (unix timestamp)
     */
    testStarted: number;
    /**
     * time when the crawl finished (unix timestamp)
     */
    testFinished: number;
    /**
     * object containing output from all collectors
     */
    data: import('./helpers/collectorsList').CollectorData;
};
type GetSiteDataOptions = {
    collectors: import('./collectors/BaseCollector')[];
    log: (...args: any[]) => void;
    urlFilter: (arg0: string, arg1: string) => boolean;
    emulateMobile: boolean;
    emulateUserAgent: boolean;
    runInEveryFrame: () => void;
    maxLoadTimeMs: number;
    extraExecutionTimeMs: number;
    collectorFlags: {
        [x: string]: string;
    };
    keepOpen: boolean;
    onStart?: OnStart | undefined;
    onError?: OnError | undefined;
    onHttpError?: OnHttpError | undefined;
};
type OnStart = (testStarted: number) => void;
type OnError = (error: unknown, context: string, collector?: import('./collectors/BaseCollector') | undefined) => void;
type OnHttpError = (statusCode: number) => boolean;
import puppeteer = require("puppeteer");
