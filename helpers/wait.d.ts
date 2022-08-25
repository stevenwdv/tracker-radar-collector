export = wait;
/**
 * @template T
 * @param {Promise<T>} promise
 * @param {number} maxMs max running time, 0 to disable timeout
 * @returns {Promise<T>}
 */
declare function wait<T>(promise: Promise<T>, maxMs: number): Promise<T>;
