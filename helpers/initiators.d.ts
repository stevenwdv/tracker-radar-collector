export type RequestInitiator = {
    type: string;
    stack?: {
        callFrames: StackFrame[];
        parent: object;
    } | undefined;
    url?: string | undefined;
    lineNumber?: number | undefined;
};
export type StackFrame = {
    functionName: string;
    scriptId: string;
    url: string;
    lineNumber: number;
    columnNumber: number;
};
/**
 * @param {RequestInitiator} initiator
 * @returns {Set<string>}
 */
export function getAllInitiators(initiator: RequestInitiator): Set<string>;
