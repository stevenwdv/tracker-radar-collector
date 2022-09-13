export type RequestInitiator = import('puppeteer').Protocol.Network.Initiator;
/**
 * @param {RequestInitiator=} initiator
 * @returns {Set<string>}
 */
export function getAllInitiators(initiator?: RequestInitiator | undefined): Set<string>;
/**
 * @param {RequestInitiator} initiator
 * @return {?string[]}
 */
export function getStack(initiator: RequestInitiator): string[] | null;
