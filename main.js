const puppeteer = require('puppeteer');

const crawlerConductor = require('./crawlerConductor');
const crawler = require('./crawler');
const breakpoints = require('./collectors/APICalls/breakpoints');

const BaseCollector = require('./collectors/BaseCollector');
const RequestCollector = require('./collectors/RequestCollector');
const APICallCollector = require('./collectors/APICallCollector');
const CookieCollector = require('./collectors/CookieCollector');
const TargetCollector = require('./collectors/TargetCollector');
const TraceCollector = require('./collectors/TraceCollector');
const ScreenshotCollector = require('./collectors/ScreenshotCollector');
const CMPCollector = require('./collectors/CMPCollector');

// reexport main pieces of code so that they can be easily imported when this project is used as a dependency
// e.g. `const {crawlerConductor} = require('3p-crawler');`
module.exports = {
    puppeteer,
    crawler,
    crawlerConductor,
    breakpoints,
    // collectors ↓
    RequestCollector,
    APICallCollector,
    CookieCollector,
    TargetCollector,
    TraceCollector,
    ScreenshotCollector,
    CMPCollector,
    // types for custom collectors ↓
    BaseCollector,
};