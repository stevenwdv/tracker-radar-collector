/**
 * @param {string} outputPath
 * @param {{startTime: Date, endTime: Date, urls: number, successes: number, failures: number, skipped: number, numberOfCrawlers: number, filterOutFirstParty: boolean, emulateMobile: boolean, proxyHost: string, regionCode: string, dataCollectors: string[], fatalError: Error}} data
 */
export function createMetadataFile(outputPath: string, { startTime, endTime, urls, successes, failures, skipped, numberOfCrawlers, filterOutFirstParty, dataCollectors, fatalError, emulateMobile, proxyHost, regionCode }: {
    startTime: Date;
    endTime: Date;
    urls: number;
    successes: number;
    failures: number;
    skipped: number;
    numberOfCrawlers: number;
    filterOutFirstParty: boolean;
    emulateMobile: boolean;
    proxyHost: string;
    regionCode: string;
    dataCollectors: string[];
    fatalError: Error;
}): void;
/**
 * @param {string} outputPath
 * @returns {boolean}
 */
export function metadataFileExists(outputPath: string): boolean;
