export = RequestCollector;
declare class RequestCollector extends BaseCollector {
    /**
     * @param {{saveResponseHash?: boolean, saveHeaders?: Array<string>}} additionalOptions
     */
    constructor(additionalOptions?: {
        saveResponseHash?: boolean;
        saveHeaders?: Array<string>;
    });
    _saveResponseHash: boolean;
    _saveHeaders: string[];
    /**
     * @type {InternalRequestData[]}
     */
    _requests: InternalRequestData[];
    /**
     * @type {Map<string, InternalRequestData>}
     */
    _unmatched: Map<string, InternalRequestData>;
    _headersFromRequestWillBeSentExtraInfo: Map<any, any>;
    _log: (...arg0: any[]) => void;
    /**
     * @param {{cdpClient: import('puppeteer').CDPSession, url: string, type: import('./TargetCollector').TargetType}} targetInfo
     */
    addTarget({ cdpClient }: {
        cdpClient: import('puppeteer').CDPSession;
        url: string;
        type: import('./TargetCollector').TargetType;
    }): Promise<void>;
    /**
     * @param {RequestId} id
     */
    findLastRequestWithId(id: RequestId): InternalRequestData;
    /**
     * @param {RequestId} id
     * @param {import('puppeteer').CDPSession} cdp
     */
    getResponseBodyHash(id: RequestId, cdp: import('puppeteer').CDPSession): Promise<string>;
    /**
     * @param {{initiator: import('../helpers/initiators').RequestInitiator, request: CDPRequest, requestId: RequestId, timestamp: Timestamp, frameId?: FrameId, type?: ResourceType, redirectResponse?: CDPResponse, wallTime: number}} data
     * @param {import('puppeteer').CDPSession} cdp
     */
    handleRequest(data: {
        initiator: import('../helpers/initiators').RequestInitiator;
        request: CDPRequest;
        requestId: RequestId;
        timestamp: Timestamp;
        frameId?: FrameId;
        type?: ResourceType;
        redirectResponse?: CDPResponse;
        wallTime: number;
    }, cdp: import('puppeteer').CDPSession): void;
    /**
     * @param {{requestId: RequestId, url: string, initiator: import('../helpers/initiators').RequestInitiator}} request
     */
    handleWebSocket(request: {
        requestId: RequestId;
        url: string;
        initiator: import('../helpers/initiators').RequestInitiator;
    }): void;
    /**
     * @param {{requestId: RequestId, timestamp: number, response: {opcode: number,  mask: boolean, payloadData: string}}} request
     */
    handleWebSocketFrameSent(request: {
        requestId: RequestId;
        timestamp: number;
        response: {
            opcode: number;
            mask: boolean;
            payloadData: string;
        };
    }): void;
    /**
     * @param {{requestId: RequestId, type: ResourceType, frameId?: FrameId, response: CDPResponse}} data
     */
    handleResponse(data: {
        requestId: RequestId;
        type: ResourceType;
        frameId?: FrameId;
        response: CDPResponse;
    }): void;
    /**
    * Network.requestWillBeSentExtraInfo
    * @param {{requestId: RequestId, associatedCookies: object, headers: Object<string, string>}} data
    */
    handleRequestWillBeSentExtraInfo(data: {
        requestId: RequestId;
        associatedCookies: object;
        headers: {
            [x: string]: string;
        };
    }): void;
    /**
     * Network.responseReceivedExtraInfo
     * @param {{requestId: RequestId, headers: Object<string, string>}} data
     */
    handleResponseExtraInfo(data: {
        requestId: RequestId;
        headers: {
            [x: string]: string;
        };
    }): void;
    /**
     * @param {{errorText: string, requestId: RequestId, timestamp: Timestamp, type: ResourceType}} data
     * @param {import('puppeteer').CDPSession} cdp
     */
    handleFailedRequest(data: {
        errorText: string;
        requestId: RequestId;
        timestamp: Timestamp;
        type: ResourceType;
    }, cdp: import('puppeteer').CDPSession): Promise<void>;
    /**
     * @param {{requestId: RequestId, encodedDataLength?: number, timestamp: Timestamp}} data
     * @param {import('puppeteer').CDPSession} cdp
     */
    handleFinishedRequest(data: {
        requestId: RequestId;
        encodedDataLength?: number;
        timestamp: Timestamp;
    }, cdp: import('puppeteer').CDPSession): Promise<void>;
    /**
     * @param {{finalUrl: string, urlFilter?: function(string):boolean}} options
     * @returns {RequestData[]}
     */
    getData({ urlFilter }: {
        finalUrl: string;
        urlFilter?: (arg0: string) => boolean;
    }): RequestData[];
}
declare namespace RequestCollector {
    export { RequestData, InternalRequestData, RequestId, Timestamp, ResourceType, FrameId, CDPRequest, CDPResponse, HttpMethod };
}
import BaseCollector = require("./BaseCollector");
type InternalRequestData = {
    id: RequestId;
    url: string;
    method?: HttpMethod | undefined;
    type: ResourceType;
    initiator?: import('../helpers/initiators').RequestInitiator | undefined;
    redirectedFrom?: string | undefined;
    redirectedTo?: string | undefined;
    status?: number | undefined;
    remoteIPAddress?: string | undefined;
    requestHeaders?: {
        [x: string]: string;
    } | undefined;
    responseHeaders?: {
        [x: string]: string;
    } | undefined;
    failureReason?: string | undefined;
    size?: number | undefined;
    startTime?: Timestamp | undefined;
    endTime?: Timestamp | undefined;
    wallTime?: number | undefined;
    responseBodyHash?: string | undefined;
    postData?: string | undefined;
};
type RequestId = string;
type CDPRequest = {
    url: string;
    method: HttpMethod;
    headers: object;
    initialPriority: 'VeryLow' | 'Low' | 'Medium' | 'High' | 'VeryHigh';
    postData: string;
};
type Timestamp = number;
type FrameId = string;
type ResourceType = 'Document' | 'Stylesheet' | 'Image' | 'Media' | 'Font' | 'Script' | 'TextTrack' | 'XHR' | 'Fetch' | 'EventSource' | 'WebSocket' | 'Manifest' | 'SignedExchange' | 'Ping' | 'CSPViolationReport' | 'Other';
type CDPResponse = {
    url: string;
    status: number;
    headers: {
        [x: string]: string;
    };
    remoteIPAddress: string;
    securityDetails: object;
};
type RequestData = {
    url: string;
    method: HttpMethod;
    type: ResourceType;
    initiators?: string[] | undefined;
    redirectedFrom?: string | undefined;
    redirectedTo?: string | undefined;
    status?: number | undefined;
    remoteIPAddress: string;
    requestHeaders: object;
    responseHeaders: object;
    responseBodyHash?: string | undefined;
    postData?: string | undefined;
    failureReason: string;
    /**
     * in bytes
     */
    size?: number | undefined;
    /**
     * duration in seconds
     */
    time?: number | undefined;
    /**
     * of the request in seconds since the unix epoch
     */
    wallTime?: number | undefined;
};
type HttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNNECT' | 'TRACE' | 'PATCH';
