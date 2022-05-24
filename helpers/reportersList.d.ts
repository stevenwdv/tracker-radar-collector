/**
 * @returns {string[]}
 */
export function getReporterIds(): string[];
/**
 * @param {string} id
 * @returns {BaseReporter}
 */
export function createReporter(id: string): BaseReporter;
import BaseReporter = require("../reporters/BaseReporter");
