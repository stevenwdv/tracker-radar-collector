export = APICallCollector;
declare class APICallCollector extends BaseCollector {
    /**
     * @param {import('./APICalls/breakpoints').BreakpointObject[]} breakpoints
     */
    constructor(breakpoints?: import('./APICalls/breakpoints').BreakpointObject[]);
    /**
     * @type {import('./APICalls/breakpoints').BreakpointObject[]}
     */
    _breakpoints: import('./APICalls/breakpoints').BreakpointObject[];
    /**
     * @type {Map<string, Map<string, number>>}
     */
    _stats: Map<string, Map<string, number>>;
    /**
     * @type {SavedCall[]}
     */
    _calls: SavedCall[];
    _log: (...arg0: any[]) => void;
    /**
     * @param {{cdpClient: import('puppeteer').CDPSession, url: string, type: import('./TargetCollector').TargetType}} targetInfo
     */
    addTarget({ cdpClient, url }: {
        cdpClient: import('puppeteer').CDPSession;
        url: string;
        type: import('./TargetCollector').TargetType;
    }): Promise<void>;
    /**
     * @param {TrackerTracker} trackerTracker
     * @param {import('puppeteer').CDPSession} cdpClient
     * @param {{context: {id: string, origin: string, auxData: {type: string}}}} params
     */
    onExecutionContextCrated(trackerTracker: TrackerTracker, cdpClient: import('puppeteer').CDPSession, params: {
        context: {
            id: string;
            origin: string;
            auxData: {
                type: string;
            };
        };
    }): Promise<void>;
    /**
     * @param {TrackerTracker} trackerTracker
     * @param {{name: string, payload: string, description: string, executionContextId: number}} params
     */
    onBindingCalled(trackerTracker: TrackerTracker, params: {
        name: string;
        payload: string;
        description: string;
        executionContextId: number;
    }): void;
    /**
     * @param {string} urlString
     * @param {function(string):boolean} urlFilter
     */
    isAcceptableUrl(urlString: string, urlFilter: (arg0: string) => boolean): boolean;
    /**
     * @param {{finalUrl: string, urlFilter?: function(string):boolean}} options
     * @returns {{callStats: Object<string, APICallData>, savedCalls: SavedCall[]}}
     */
    getData({ urlFilter }: {
        finalUrl: string;
        urlFilter?: (arg0: string) => boolean;
    }): {
        callStats: {
            [x: string]: APICallData;
        };
        savedCalls: SavedCall[];
    };
}
declare namespace APICallCollector {
    export { APICallData, SavedCall, APICallReport };
}
import BaseCollector = require("./BaseCollector");
type SavedCall = {
    /**
     * - source script
     */
    source: string;
    /**
     * - breakpoint description
     */
    description: string;
    /**
     * - preview or the passed arguments
     */
    arguments: string[];
    /**
     * - full stack
     */
    stack?: string[];
    /**
     * - custom captured data
     */
    custom?: any | undefined;
};
import TrackerTracker = require("./APICalls/TrackerTracker");
type APICallData = {
    [x: string]: number;
};
type APICallReport = {
    savedCalls: SavedCall[];
    callStats: {
        [x: string]: APICallData;
    };
};
