export = CMPCollector;
declare class CMPCollector extends BaseCollector {
    /**
     * @param {CollectorInitOptions} options
     */
    init(options: CollectorInitOptions): void;
    log: (...arg0: any[]) => void;
    shortTimeouts: string;
    /** @private */
    private autoAction;
    /**
     * @type {ContentScriptMessage[]}
     * @private
     */
    private receivedMsgs;
    selfTestFrame: any;
    isolated2pageworld: Map<any, any>;
    pendingScan: {
        promise: Promise<any>;
        resolve: Function;
        reject: Function;
    };
    context: import("puppeteer").BrowserContext;
    /** @type {ScanResult} */
    scanResult: ScanResult;
    /**
     * @param {Partial<ContentScriptMessage>} msg
     * @returns {ContentScriptMessage | null}
     * @private
     */
    private findMessage;
    /**
     * @param {Partial<ContentScriptMessage>} msg
     * @returns {ContentScriptMessage[]}
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
     * @param {ContentScriptMessage} msg
     * @param {any} executionContextId
     * @returns {Promise<void>}
     * @private
     */
    private handleMessage;
    /**
     * @param {Partial<ContentScriptMessage>} msg
     * @returns {Promise<ContentScriptMessage>}
     * @private
     */
    private waitForMessage;
    /**
     * @returns {Promise<void>}
     * @private
     */
    private waitForFinish;
    postLoad(): Promise<void>;
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
    export { CollectorInitOptions, AutoAction, ContentScriptMessage, AutoconsentConfig, DetectedMessage, SelfTestResultMessage, ErrorMessage, OptOutResultMessage, OptInResultMessage, DoneMessage, ScanResult, CMPResult };
}
import BaseCollector = require("./BaseCollector");
type CollectorInitOptions = import('./BaseCollector').CollectorInitOptions;
type ScanResult = {
    snippets: string[];
    patterns: string[];
};
type CMPResult = {
    name: string;
    final: boolean;
    open: boolean;
    started: boolean;
    succeeded: boolean;
    selfTestFail: boolean;
    errors: string[];
    patterns: string[];
    snippets: string[];
};
type AutoAction = import('@duckduckgo/autoconsent/lib/types').AutoAction;
type ContentScriptMessage = import('@duckduckgo/autoconsent/lib/messages').ContentScriptMessage;
type AutoconsentConfig = import('@duckduckgo/autoconsent/lib/types').Config;
type DetectedMessage = import('@duckduckgo/autoconsent/lib/messages').DetectedMessage;
type SelfTestResultMessage = import('@duckduckgo/autoconsent/lib/messages').SelfTestResultMessage;
type ErrorMessage = import('@duckduckgo/autoconsent/lib/messages').ErrorMessage;
type OptOutResultMessage = import('@duckduckgo/autoconsent/lib/messages').OptOutResultMessage;
type OptInResultMessage = import('@duckduckgo/autoconsent/lib/messages').OptInResultMessage;
type DoneMessage = import('@duckduckgo/autoconsent/lib/messages').DoneMessage;
