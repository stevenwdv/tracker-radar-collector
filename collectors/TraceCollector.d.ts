export = TraceCollector;
declare class TraceCollector extends BaseCollector {
    init(): void;
    /**
     * @type {boolean}
     */
    _tracing: boolean;
    /**
     * @type {import('puppeteer').CDPSession}
     */
    _cdpClient: import('puppeteer').CDPSession;
    /**
    * @param {string} handle
    */
    _readStream(handle: string): Promise<Buffer>;
    /**
     * @param {{cdpClient: import('puppeteer').CDPSession, url: string, type: import('./TargetCollector').TargetType}} targetInfo
     */
    addTarget({ cdpClient, type }: {
        cdpClient: import('puppeteer').CDPSession;
        url: string;
        type: import('./TargetCollector').TargetType;
    }): Promise<void>;
    /**
     * @returns {Promise<TargetData[]>}
     */
    getData(): Promise<TargetData[]>;
}
declare namespace TraceCollector {
    export { TargetData };
}
import BaseCollector = require("./BaseCollector");
type TargetData = {
    url: string;
    type: import('./TargetCollector').TargetType;
};
