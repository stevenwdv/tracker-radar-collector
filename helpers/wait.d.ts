export = wait;
/**
 * @param {Promise<any>} promise
 * @param {number} maxMs max running time, 0 to disable timeout
 * @returns {Promise<any>}
 */
declare function wait(promise: Promise<any>, maxMs: number): Promise<any>;
