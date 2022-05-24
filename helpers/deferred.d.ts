export = createDeferred;
/**
 * @returns {{promise: Promise<any>, resolve: function, reject: function}}
 */
declare function createDeferred(): {
    promise: Promise<any>;
    resolve: Function;
    reject: Function;
};
