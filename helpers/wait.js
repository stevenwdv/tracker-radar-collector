/**
 * @param {Promise<any>} promise
 * @param {number} maxMs max running time, 0 to disable timeout
 * @returns {Promise<any>}
 */
function wait(promise, maxMs) {
    if (!maxMs) {return promise;}
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Operation timed out'));
        }, maxMs);

        promise.then(result => {
            clearTimeout(timeout);
            resolve(result);
        }).catch(e => reject(e));
    });
}

module.exports = wait;