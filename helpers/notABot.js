/* eslint-env browser */

// simple anti-bot-detection countermeasures running in the browser context

module.exports = () => {
    if (window.Notification && Notification.permission === 'denied') {
        Reflect.defineProperty(window.Notification, 'permission', {get: () => 'default'});
    }

    if (window.Navigator) {
        Reflect.defineProperty(window.Navigator.prototype, 'webdriver', {get: () => undefined});
    }

    // @ts-ignore 'chrome' is a non-standard prop
    if (!window.chrome || !window.chrome.runtime) {
        // @ts-ignore
        window.chrome = {
            app: {
                InstallState: {
                    DISABLED: "disabled",
                    INSTALLED: "installed",
                    NOT_INSTALLED: "not_installed"
                },
                RunningState: {
                    CANNOT_RUN: "cannot_run",
                    READY_TO_RUN: "ready_to_run",
                    RUNNING: "running"
                },

                isInstalled: false,
                /** @returns {null} */
                getDetails() {return null;},
                getIsInstalled() {return false;},
                installState() {throw new TypeError();},
                runningState() {return "cannot_run";}
            },

            /* dummy timings etc. */
            csi() {
                return {
                    onloadT: 1234567890123,
                    pageT: 456789,
                    startE: 1234567890123,
                    tran: 15
                };
            },
            loadTimes() {
                return {
                    commitLoadTime: 1234567890,
                    connectionInfo: "h2",
                    finishDocumentLoadTime: 1234567890,
                    finishLoadTime: 1234567890,
                    firstPaintAfterLoadTime: 0,
                    firstPaintTime: 1234567890,
                    navigationType: "Other",
                    npnNegotiatedProtocol: "h2",
                    requestTime: 1234567890,
                    startLoadTime: 1234567890,
                    wasAlternateProtocolAvailable: false,
                    wasFetchedViaSpdy: true,
                    wasNpnNegotiated: true
                };
            },
        };
    }

    if (window.Navigator && window.navigator.plugins.length === 0) {
        Reflect.defineProperty(window.Navigator.prototype, 'plugins', {
            get: () => ([
                {
                    description: "Portable Document Format",
                    filename: "internal-pdf-viewer",
                    name: "Chrome PDF Plugin",
                    0: {type: "application/pdf"}
                }
            ])
        });
    }
};
