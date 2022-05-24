export = CLIReporter;
declare class CLIReporter extends BaseReporter {
    verbose: boolean;
    progressBar: ProgressBar;
    /**
     * @param  {...any} msg
     */
    alwaysLog(...msg: any[]): void;
    /**
     * @param {{site: string, failures: number, successes: number, urls: number}} data
     */
    update(data: {
        site: string;
        failures: number;
        successes: number;
        urls: number;
    }): void;
}
import BaseReporter = require("./BaseReporter");
import ProgressBar = require("progress");
