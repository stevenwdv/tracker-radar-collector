/**
 * @template T
 * @param {Promise<T>} promise
 * @param {number} maxMs max running time, 0 to disable timeout
 * @returns {Promise<T>}
 */
function wait(promise, maxMs) {
    if (!maxMs) {return promise;}
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(
            () => reject(new Error("Operation timed out")),
            maxMs
        );
        promise
            .finally(() => clearTimeout(timeout))
            .then(resolve)
            .catch(reject);
    });
}

module.exports = wait;