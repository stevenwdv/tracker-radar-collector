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
}
import BaseCollector = require("./BaseCollector");
