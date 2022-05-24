export = downloadCustomChromium;
/**
 * @param {function} log
 * @param {string} version
 * @returns {Promise<string>} executable path of the downloaded Chromium
 */
declare function downloadCustomChromium(log: Function, version: string): Promise<string>;
