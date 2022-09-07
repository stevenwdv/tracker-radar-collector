export = BaseReporter;
declare class BaseReporter {
    id(): string;
    /**
     * Called once before crawling starts
     *
     * @param {{verbose: boolean, startTime: Date, urls: number, logPath: string}} options
     */
    init(options: {
        verbose: boolean;
        startTime: Date;
        urls: number;
        logPath: string;
    }): void;
    /**
     * Called whenever site was crawled (either successfully or not)
     *
     * @param {{site: string, failures: number, successes: number, urls: number, data: import("../crawler").CollectResult | undefined, crawlTimes: Array<Array<number>>, fatalError: Error, numberOfCrawlers: number, regionCode: string}} data
     */
    update(data: {
        site: string;
        failures: number;
        successes: number;
        urls: number;
        data: import("../crawler").CollectResult | undefined;
        crawlTimes: Array<Array<number>>;
        fatalError: Error;
        numberOfCrawlers: number;
        regionCode: string;
    }): void;
    /**
     * Called whenever some message is meant to be logged (not every reporter has to support that)
     *
     * @param  {...any} messages
     */
    log(...messages: any[]): void;
    /**
     * Called at the end of crawling, gives time for clean up (if needed)
     *
     * @param {{endTime: Date, successes: number, failures: number, urls: number}} data
     * @returns {Promise<void>}
     */
    cleanup(data: {
        endTime: Date;
        successes: number;
        failures: number;
        urls: number;
    }): Promise<void>;
}
