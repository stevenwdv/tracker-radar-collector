/**
 * @param {Object<string, string>} headers
 * @param {string[]} safelist
 *
 * @returns {Object<string, string>|null}
 */
export function filterHeaders(headers: {
    [x: string]: string;
}, safelist: string[]): {
    [x: string]: string;
} | null;
/**
 * Make sure all header names are trimmed and lowercase
 *
 * @param {Object<string, string>} headers
 *
 * @returns {Object<string, string>}
 */
export function normalizeHeaders(headers: {
    [x: string]: string;
}): {
    [x: string]: string;
};
