export = TargetCollector;
declare class TargetCollector extends BaseCollector {
    init(): void;
    /**
     * @type {TargetData[]}
     */
    _targets: TargetData[];
    /**
     * @param {{cdpClient: import('puppeteer').CDPSession, url: string, type: TargetType}} targetInfo
     */
    addTarget({ type, url }: {
        cdpClient: import('puppeteer').CDPSession;
        url: string;
        type: TargetType;
    }): void;
    /**
     * @returns {TargetData[]}
     */
    getData(): TargetData[];
}
declare namespace TargetCollector {
    export { TargetData, TargetType };
}
import BaseCollector = require("./BaseCollector");
type TargetData = {
    url: string;
    type: TargetType;
};
type TargetType = 'page' | 'background_page' | 'service_worker' | 'shared_worker' | 'other' | 'browser' | 'webview';
