export = BaseCollector;
declare class BaseCollector {
    id(): string;
    /**
     * Called before the crawl begins. Can be async, can throw errors.
     *
     * @param {CollectorInitOptions} options
     */
    init(options: CollectorInitOptions): void;
    /**
     * Called whenever new target becomes available (e.g. main page, iframe, web worker). Can be async, can throw errors.
     *
     * @param {{cdpClient: import('puppeteer').CDPSession, url: string, type: import('./TargetCollector').TargetType}} targetInfo
     */
    addTarget(targetInfo: {
        cdpClient: import('puppeteer').CDPSession;
        url: string;
        type: import('./TargetCollector').TargetType;
    }): void;
    /**
     * Called after the crawl to retrieve the data. Can be async, can throw errors.
     *
     * @param {{finalUrl: string, urlFilter?: function(string):boolean, pageLoadDurationMs: number}} options
     * @returns {Promise<Object>|Object}
     */
    getData(options: {
        finalUrl: string;
        urlFilter?: (arg0: string) => boolean;
        pageLoadDurationMs: number;
    }): Promise<Object> | Object;
}
declare namespace BaseCollector {
    export { CollectorInitOptions };
}
type CollectorInitOptions = {
    context: import('puppeteer').BrowserContext;
    url: URL;
    log: (...args: any[]) => void;
    collectorFlags: {
        [x: string]: string;
    };
};
