export = crawl;
/**
 * @param {URL} url
 * @param {CrawlOptions} options
 * @returns {Promise<CollectResult>}
 */
declare function crawl(url: URL, options: CrawlOptions): Promise<CollectResult>;
declare namespace crawl {
    export { CrawlOptions, GetSiteDataOptions, CollectResult };
}
type CrawlOptions = {
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
    maxCollectionTimeMs?: number;
    collectorFlags?: {
        [x: string]: boolean;
    };
    headed?: boolean;
    devtools?: boolean;
    keepOpen?: boolean;
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
        [x: string]: boolean;
    };
    keepOpen: boolean;
};
import puppeteer = require("puppeteer");
