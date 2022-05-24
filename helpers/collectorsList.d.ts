export type CollectorData = {
    apis?: import('../collectors/APICallCollector').APICallReport | undefined;
    cmps?: {
        name: string;
        isOpen: boolean;
        optOutRuns: boolean;
        optOutSucceeds: boolean;
        error: string;
    }[] | undefined;
    cookies?: import('../collectors/CookieCollector').CookieData[] | undefined;
    elements?: {
        present: string[];
        visible: string[];
    } | undefined;
    requests?: import('../collectors/RequestCollector').RequestData[] | undefined;
    screenshots?: string | undefined;
    targets?: import('../collectors/TargetCollector').TargetData[] | undefined;
};
/**
 * @returns {string[]}
 */
export function getCollectorIds(): string[];
/**
 * @param {string} id
 * @returns {BaseCollector}
 */
export function createCollector(id: string): BaseCollector;
import BaseCollector = require("../collectors/BaseCollector");
