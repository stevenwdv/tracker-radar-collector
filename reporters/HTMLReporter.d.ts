export = HTMLReporter;
declare class HTMLReporter extends BaseReporter {
    logPath: string;
    /**
     * @type {Array<{path: string, url: string}>}
     */
    screenshotPaths: {
        path: string;
        url: string;
    }[];
    startTime: Date;
}
import BaseReporter = require("./BaseReporter");
