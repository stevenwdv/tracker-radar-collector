export = ScreenshotCollector;
declare class ScreenshotCollector extends BaseCollector {
    /**
     * @param {{cdpClient: import('puppeteer').CDPSession, url: string, type: import('./TargetCollector').TargetType}} targetInfo
     */
    addTarget({ cdpClient, type }: {
        cdpClient: import('puppeteer').CDPSession;
        url: string;
        type: import('./TargetCollector').TargetType;
    }): void;
    _cdpClient: import("puppeteer").CDPSession;
    /**
     * @returns {Promise<string>}
     */
    getData(): Promise<string>;
}
import BaseCollector = require("./BaseCollector");
