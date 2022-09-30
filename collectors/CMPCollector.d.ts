export = CMPCollector;
declare class CMPCollector extends BaseCollector {
    /**
     * @param {import('./BaseCollector.js').CollectorInitOptions} options
     */
    init(options: import('./BaseCollector.js').CollectorInitOptions): void;
    log: (...arg0: any[]) => void;
    shortTimeouts: string;
    /** @private */
    private autoAction;
    /**
     * @type {import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage[]}
     * @private
     */
    private receivedMsgs;
    selfTestFrame: any;
    isolated2pageworld: Map<any, any>;
    /**
     * @param {Partial<import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage>} msg
     * @returns {import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage | null}
     * @private
     */
    private findMessage;
    /**
     * @param {Partial<import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage>} msg
     * @returns {import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage[]}
     * @private
     */
    private findAllMessages;
    /**
     * @param {{cdpClient: import('puppeteer').CDPSession, url: string, type: import('./TargetCollector.js').TargetType}} targetInfo
     */
    addTarget(targetInfo: {
        cdpClient: import('puppeteer').CDPSession;
        url: string;
        type: import('./TargetCollector.js').TargetType;
    }): Promise<void>;
    _cdpClient: import("puppeteer").CDPSession;
    /**
     * Implements autoconsent messaging protocol
     *
     * @param {import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage} msg
     * @param {any} executionContextId
     * @returns {Promise<void>}
     * @private
     */
    private handleMessage;
    /**
     * @param {Partial<import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage>} msg
     * @returns {Promise<import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage>}
     * @private
     */
    private waitForMessage;
    /**
     * @returns {Promise<void>}
     * @private
     */
    private waitForFinish;
    /**
     * @returns {CMPResult[]}
     * @private
     */
    private collectResults;
    /**
     * Called after the crawl to retrieve the data. Can be async, can throw errors.
     *
     * @returns {Promise<CMPResult[]>}
     */
    getData(): Promise<CMPResult[]>;
}
declare namespace CMPCollector {
    export { CMPResult };
}
import BaseCollector = require("./BaseCollector");
type CMPResult = {
    name: string;
    final: boolean;
    open: boolean;
    started: boolean;
    succeeded: boolean;
    selfTestFail: boolean;
    errors: string[];
};
