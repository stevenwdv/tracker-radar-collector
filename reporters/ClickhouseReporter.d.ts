export = ClickhouseReporter;
declare class ClickhouseReporter extends BaseReporter {
    verbose: boolean;
    client: ClickHouse;
    crawlId: string;
    ready: any;
    queue: {
        pages: any[];
        requests: any[];
        elements: any[];
        cmps: any[];
        apiSavedCalls: any[];
        apiCallStats: any[];
        cookies: any[];
        targets: any[];
    };
    /**
     * @param {string} name
     * @param {string} region
     */
    createCrawl(name?: string, region?: string): any;
    /**
     * @param {import('../crawler').CollectResult} data
     */
    processSite(data: import('../crawler').CollectResult): any;
    commitQueue(): Promise<void>;
    /**
     * @returns {Promise<void>}
     */
    cleanup(): Promise<void>;
}
import BaseReporter = require("./BaseReporter");
import { ClickHouse } from "clickhouse";
