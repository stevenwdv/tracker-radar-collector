export = TrackerTracker;
declare class TrackerTracker {
    /**
     * @param {function(string, object=): Promise<object>} sendCommand
     * @param {import('./breakpoints').BreakpointObject[]} breakpoints
     */
    constructor(sendCommand: (arg0: string, arg1: object | undefined) => Promise<object>, breakpoints: import('./breakpoints').BreakpointObject[]);
    /**
     * @type {function(...any): void}
     */
    _log: (...arg0: any[]) => void;
    /**
     * @type {function(string, object=): Promise<object>}
     */
    _send: (arg0: string, arg1?: object | undefined) => Promise<object>;
    /**
     * @type {string}
     */
    _mainURL: string;
    /**
     * @type {import('./breakpoints').BreakpointObject[]}
     */
    _breakpoints: import('./breakpoints').BreakpointObject[];
    /**
     * @param {{log: function(...any): void}} options
     */
    init({ log }: {
        log: (...args: any[]) => void;
    }): Promise<void>;
    /**
     * @param {string} command
     * @param {object} payload
     * @returns {Promise<object>}
     */
    sendCommand(command: string, payload?: object): Promise<object>;
    /**
     * @param {string} url
     */
    setMainURL(url: string): void;
    /**
     * @param {string} expression
     * @param {(string | function(any): boolean)} condition
     * @param {string} description
     * @param {boolean} saveArguments
     * @param {CDPContextId} contextId
     * @param {boolean} fullStack
     * @param {boolean} pauseDebugger
     * @param {(string | function(any): unknown)} customCapture
     */
    _addBreakpoint(expression: string, condition: (string | ((arg0: any) => boolean)), description: string, contextId: CDPContextId, saveArguments: boolean, fullStack: boolean, pauseDebugger: boolean, customCapture: (string | ((arg0: any) => unknown))): Promise<void>;
    /**
     * @param {CDPContextId} contextId
     */
    setupContextTracking(contextId?: CDPContextId): Promise<void>;
    /**
     * Return top non-anonymous source from the stack trace.
     *
     * @param {string} stack JS stack trace
     * @returns {string}
     */
    _getScriptURL(stack: string): string;
    /**
     * @param {string} stack
     * @returns {string[]}
     */
    _getStackFrames(stack: string): string[];
    /**
     * @param {string} breakpointName
     * @returns {import('./breakpoints').MethodBreakpoint|import('./breakpoints').PropertyBreakpoint}
     */
    _getBreakpointByName(breakpointName: string): import('./breakpoints').MethodBreakpoint | import('./breakpoints').PropertyBreakpoint;
    /**
     * @param {{payload: string, description: string, executionContextId: number}} params
     * @returns {{description: string, source: string, saveArguments: boolean, arguments: string[], stack?: string[], custom?: unknown}}
     */
    processDebuggerPause(params: {
        payload: string;
        description: string;
        executionContextId: number;
    }): {
        description: string;
        source: string;
        saveArguments: boolean;
        arguments: string[];
        stack?: string[];
        custom?: unknown;
    };
}
declare namespace TrackerTracker {
    export { CDPContextId, CDPBreakpointId };
}
type CDPContextId = string;
type CDPBreakpointId = string;
