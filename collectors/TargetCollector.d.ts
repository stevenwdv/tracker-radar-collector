export = TargetCollector;
declare class TargetCollector extends BaseCollector {
    init(): void;
    /**
     * @type {TargetData[]}
     */
    _targets: TargetData[];
    /**
     * @returns {TargetData[]}
     */
    getData(): TargetData[];
}
declare namespace TargetCollector {
    export { TargetData, TargetType };
}
import BaseCollector = require("./BaseCollector");
type TargetData = {
    url: string;
    type: TargetType;
};
type TargetType = 'page' | 'background_page' | 'service_worker' | 'shared_worker' | 'other' | 'browser' | 'webview';
