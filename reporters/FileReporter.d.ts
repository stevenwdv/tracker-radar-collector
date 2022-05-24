/// <reference types="node" />
export = FileReporter;
declare class FileReporter extends BaseReporter {
    logFile: fs.WriteStream;
    /**
     * @returns {Promise<void>}
     */
    cleanup(): Promise<void>;
}
import BaseReporter = require("./BaseReporter");
import fs = require("fs");
