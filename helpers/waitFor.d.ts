export = waitFor;
/**
 * @param {() => Promise<boolean> | boolean} predicate
 * @param {number} maxTimes
 * @param {number} interval
 * @returns {Promise<boolean>}
 */
declare function waitFor(predicate: () => Promise<boolean> | boolean, maxTimes: number, interval: number): Promise<boolean>;
