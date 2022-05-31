export = CMPCollector;
declare class CMPCollector extends BaseCollector {
    context: import("puppeteer").BrowserContext;
    doOptOut: boolean;
    log: (...arg0: any[]) => void;
    /**
     * @type {import('puppeteer').Frame[]}
     */
    frames: import('puppeteer').Frame[];
    page: import("puppeteer").Page;
    check: Promise<any>;
    tab: import("@duckduckgo/autoconsent/lib/tabwrapper").default;
    /**
     * Called after the crawl to retrieve the data. Can be async, can throw errors.
     *
     * @param {{finalUrl: string, urlFilter?: function(string):boolean}} options
     * @returns {Promise<Object>|Object}
     */
    getData(options: {
        finalUrl: string;
        urlFilter?: (arg0: string) => boolean;
    }): Promise<Object> | Object;
}
import BaseCollector = require("./BaseCollector");
