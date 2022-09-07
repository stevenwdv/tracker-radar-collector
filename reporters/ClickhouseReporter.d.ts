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
        apiSavedCalls: any[];
        cmps: any[];
        apiCallStats: any[];
        cookies: any[];
        targets: any[];
    };
    /**
     * @param {string} name
     * @param {string} region
     */
    createCrawl(name?: string, region?: string): any;
    deleteCrawlData(): Promise<void>;
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
