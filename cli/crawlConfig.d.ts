export type CrawlConfig = {
    output: string;
    urls: Array<string | {
        url: string;
        dataCollectors: Array<string>;
    }>;
    dataCollectors: Array<string>;
    reporters: Array<string>;
    logPath: string;
    crawlers: number;
    proxyConfig: string;
    regionCode: string;
    chromiumVersion: string;
    filterOutFirstParty: boolean;
    forceOverwrite: boolean;
    verbose: boolean;
    emulateMobile: boolean;
    disableAntiBot: boolean;
    maxLoadTimeMs: number;
    extraExecutionTimeMs: number;
};
/**
 * Looks at CLI flags, JSON config etc. to figure out the final crawl config
 *
 * @param {{config?: string, verbose?: boolean, forceOverwrite?: boolean, only3p?: boolean, mobile?: boolean, disableAntiBot?: boolean, output?: string, logPath?: string, crawlers?: string, proxyConfig?: string, regionCode?: string, chromiumVersion?: string, dataCollectors?: string, reporters?: string, url?: string, inputList?: string}} flags
 * @returns {CrawlConfig}
 */
export function figureOut(flags: {
    config?: string;
    verbose?: boolean;
    forceOverwrite?: boolean;
    only3p?: boolean;
    mobile?: boolean;
    disableAntiBot?: boolean;
    output?: string;
    logPath?: string;
    crawlers?: string;
    proxyConfig?: string;
    regionCode?: string;
    chromiumVersion?: string;
    dataCollectors?: string;
    reporters?: string;
    url?: string;
    inputList?: string;
}): CrawlConfig;
