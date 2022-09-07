export = CMPCollector;
declare class CMPCollector extends BaseCollector {
    log: (...arg0: any[]) => void;
    shortTimeouts: string;
    autoAction: import("@duckduckgo/autoconsent/lib/types").AutoAction;
    /** @type {import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage[]} */
    receivedMsgs: import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage[];
    selfTestFrame: any;
    isolated2pageworld: Map<any, any>;
    /**
     * @param {Partial<import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage>} msg
     * @returns {import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage | null}
     */
    findMessage(msg: Partial<import("@duckduckgo/autoconsent/lib/messages").ContentScriptMessage>, partial?: boolean): import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage | null;
    /**
     * @param {Partial<import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage>} msg
     * @returns {import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage[]}
     */
    findAllMessages(msg: Partial<import("@duckduckgo/autoconsent/lib/messages").ContentScriptMessage>, partial?: boolean): import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage[];
    /**
     * @param {{cdpClient: import('puppeteer').CDPSession, url: string, type: import('./TargetCollector').TargetType}} targetInfo
     */
    addTarget(targetInfo: {
        cdpClient: import('puppeteer').CDPSession;
        url: string;
        type: import('./TargetCollector').TargetType;
    }): Promise<void>;
    _cdpClient: import("puppeteer").CDPSession;
    /**
     * Implements autoconsent messaging protocol
     *
     * @param {import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage} msg
     * @param {any} executionContextId
     * @returns {Promise<void>}
     */
    handleMessage(msg: import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage, executionContextId: any): Promise<void>;
    /**
     * @param {Partial<import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage>} msg
     * @returns {Promise<import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage>}
     */
    waitForMessage(msg: Partial<import("@duckduckgo/autoconsent/lib/messages").ContentScriptMessage>, maxTimes?: number, interval?: number): Promise<import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage>;
    /**
     * @returns {Promise<void>}
     */
    waitForFinish(): Promise<void>;
    /**
     * @returns {CMPResult[]}
     */
    collectResults(): CMPResult[];
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
