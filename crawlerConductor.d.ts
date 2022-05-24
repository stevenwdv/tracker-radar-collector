/// <reference types="node" />
declare function _exports(options: {
    urls: Array<string | {
        url: string;
        dataCollectors?: BaseCollector[];
    }>;
    dataCallback: (arg0: URL, arg1: import('./crawler').CollectResult) => void;
    dataCollectors?: BaseCollector[];
    failureCallback?: (arg0: string, arg1: Error) => void;
    numberOfCrawlers?: number;
    logFunction?: Function;
    filterOutFirstParty: boolean;
    emulateMobile: boolean;
    proxyHost: string;
    antiBotDetection?: boolean;
    chromiumVersion?: string;
    maxLoadTimeMs?: number;
    extraExecutionTimeMs?: number;
    collectorFlags?: {
        [x: string]: boolean;
    };
}): Promise<void>;
export = _exports;
import BaseCollector = require("./collectors/BaseCollector");
import URL_1 = require("url");
import URL = URL_1.URL;
