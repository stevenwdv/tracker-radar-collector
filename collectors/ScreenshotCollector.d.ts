export = ScreenshotCollector;
declare class ScreenshotCollector extends BaseCollector {
    _cdpClient: import("puppeteer").CDPSession;
    /**
     * @returns {Promise<string>}
     */
    getData(): Promise<string>;
}
import BaseCollector = require("./BaseCollector");
