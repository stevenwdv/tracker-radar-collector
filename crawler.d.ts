export = crawl;
/**
 * @param {URL} url
 * @param {{collectors?: import('./collectors/BaseCollector')[], log?: function(...any):void, filterOutFirstParty?: boolean, emulateMobile?: boolean, emulateUserAgent?: boolean, proxyHost?: string, browserContext?: puppeteer.BrowserContext, runInEveryFrame?: function():void, executablePath?: string, maxLoadTimeMs?: number, extraExecutionTimeMs?: number, collectorFlags?: Object.<string, boolean>}} options
 * @returns {Promise<CollectResult>}
 */
declare function crawl(url: URL, options: {
    collectors?: import('./collectors/BaseCollector')[];
    log?: (...args: any[]) => void;
    filterOutFirstParty?: boolean;
    emulateMobile?: boolean;
    emulateUserAgent?: boolean;
    proxyHost?: string;
    browserContext?: puppeteer.BrowserContext;
    runInEveryFrame?: () => void;
    executablePath?: string;
    maxLoadTimeMs?: number;
    extraExecutionTimeMs?: number;
    collectorFlags?: {
        [x: string]: boolean;
    };
}): Promise<CollectResult>;
declare namespace crawl {
    export { CollectResult };
}
import puppeteer = require("puppeteer");
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
