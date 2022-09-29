export type RequestInitiator = import('puppeteer').Protocol.Network.Initiator;
export type StackFrame = {
    url: string;
    function: string;
    line: number;
    column: number;
};
/**
 * @param {RequestInitiator=} initiator
 * @returns {Set<string>}
 */
export function getAllInitiators(initiator?: RequestInitiator | undefined): Set<string>;
/**
 * @param {RequestInitiator} initiator
 * @return {?StackFrame[]}
 */
export function getStack(initiator: RequestInitiator): StackFrame[] | null;
