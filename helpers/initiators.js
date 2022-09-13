/**
 * @param {import('puppeteer').Protocol.Runtime.StackTrace} stack
 * @returns {string[]}
 */
function getInitiatorsFromStack(stack) {
    /**
     * @type {string[]}
     */
    const currentInitiators = [];
    /**
     * @type {string[]}
     */
    let parentInitiators = [];

    stack.callFrames.forEach(frame => {
        if (frame.url) {
            currentInitiators.push(frame.url);
        }
    });

    if (stack.parent) {
        parentInitiators = getInitiatorsFromStack(stack.parent);
    }

    return currentInitiators.concat(parentInitiators);
}

/**
 * @param {RequestInitiator=} initiator
 * @returns {Set<string>}
 */
function getAllInitiators(initiator) {
    const allInitiators = new Set();

    if (!initiator) {
        return allInitiators;
    }

    if (initiator.url) {
        allInitiators.add(initiator.url);
    }

    if (initiator.stack) {
        getInitiatorsFromStack(initiator.stack)
            .forEach(url => allInitiators.add(url));
    }

    return allInitiators;
}

/**
 * @param {import('puppeteer').Protocol.Runtime.StackTrace} trace
 * @return {Generator<string, void, undefined>}
 */
function *getStackFromTrace(trace) {
    for (const frame of trace.callFrames) {
        yield `${frame.functionName} @${frame.url}:${frame.lineNumber}:${frame.columnNumber}`;
    }
    if (trace.parent) {
        yield* getStackFromTrace(trace.parent);
    }
}

/**
 * @param {RequestInitiator} initiator
 * @return {?string[]}
 */
function getStack(initiator) {
    if (!initiator.stack) {return null;}
    return [...getStackFromTrace(initiator.stack)];
}

module.exports = {
    getAllInitiators,
    getStack,
};

/**
 * @typedef {import('puppeteer').Protocol.Network.Initiator} RequestInitiator
 */
