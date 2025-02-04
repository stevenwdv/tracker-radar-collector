class BaseCollector {

    id() {
        return 'base';
    }

    /**
     * Called before the crawl begins. Can be async, can throw errors.
     *
     * @param {CollectorInitOptions} options
     * @returns {Promise<void>|void}
     */
    // eslint-disable-next-line no-unused-vars
    init(options) {
    }

    /**
     * Called whenever new target becomes available (e.g. main page, iframe, web worker). Can be async, can throw errors.
     *
     * @param {{cdpClient: import('puppeteer').CDPSession, url: string, type: import('./TargetCollector').TargetType}} targetInfo
     * @returns {Promise<void>|void}
     */
    // eslint-disable-next-line no-unused-vars
    addTarget(targetInfo) {
    }

    /**
     * Called after the crawl to retrieve the data. Can be async, can throw errors.
     *
     * @param {{finalUrl: string, urlFilter?: function(string):boolean, pageLoadDurationMs: number}} options
     * @returns {Promise<unknown>|unknown}
     */
    // eslint-disable-next-line no-unused-vars
    getData(options) {
        return Promise.resolve();
    }
}

/**
 * @typedef CollectorInitOptions
 * @property {import('puppeteer').BrowserContext} context
 * @property {URL} url
 * @property {function(...any):void} log
 * @property {Object.<string, string>} collectorFlags
 */

module.exports = BaseCollector;