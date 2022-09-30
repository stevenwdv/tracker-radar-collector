export = CookieCollector;
declare class CookieCollector extends BaseCollector {
    /**
     * CDP returns the date in a weird format (e.g. 1577836800.325027), here we fix it
     *
     * @param {number} cdpDate
     * @returns {number}
     */
    normalizeDate(cdpDate: number): number;
    /**
     * @param {{cdpClient: import('puppeteer').CDPSession, url: string, type: import('./TargetCollector').TargetType}} targetInfo
     */
    addTarget({ cdpClient, type }: {
        cdpClient: import('puppeteer').CDPSession;
        url: string;
        type: import('./TargetCollector').TargetType;
    }): void;
    _cdpClient: import("puppeteer").CDPSession;
    /**
     * @returns {Promise<CookieData[]>}
     */
    getData(): Promise<CookieData[]>;
}
declare namespace CookieCollector {
    export { CookieData, CDPCookie };
}
import BaseCollector = require("./BaseCollector");
type CookieData = {
    name: string;
    domain: string;
    path: string;
    expires?: number | undefined;
    session: boolean;
    sameSite?: ('Strict' | 'Lax' | 'Extended' | 'None') | undefined;
};
type CDPCookie = {
    name: string;
    value: string;
    domain: string;
    path: string;
    expires: number;
    size: number;
    httpOnly: boolean;
    secure: boolean;
    session: boolean;
    sameSite: 'Strict' | 'Lax' | 'Extended' | 'None';
};
