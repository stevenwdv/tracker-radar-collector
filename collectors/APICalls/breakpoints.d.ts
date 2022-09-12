export = breakpoints;
/**
 * @type {BreakpointObject[]}
 */
declare const breakpoints: BreakpointObject[];
declare namespace breakpoints {
    export { BreakpointObject, MethodBreakpoint, PropertyBreakpoint };
}
type BreakpointObject = {
    global?: string | undefined;
    proto?: string | undefined;
    props: PropertyBreakpoint[];
    methods: MethodBreakpoint[];
};
type MethodBreakpoint = {
    /**
     * - name of the method
     */
    name: string;
    /**
     * - test expression that should trigger given breakpoint
     */
    test?: string | undefined;
    /**
     * - human-readable description of a breakpoint
     */
    description?: string | undefined;
    /**
     * - additional condition that has to be truthy for the breakpoint to fire
     */
    condition?: (string | ((arg0: any) => boolean)) | undefined;
    /**
     * - save arguments of each call (defaults to false)
     */
    saveArguments?: boolean | undefined;
    /**
     * save full call stack
     */
    fullStack?: boolean | undefined;
    /**
     * pause debugger on hit
     */
    pauseDebugger?: boolean | undefined;
    /**
     * custom capturing function
     */
    customCapture?: (string | ((arg0: any) => unknown)) | undefined;
};
type PropertyBreakpoint = {
    /**
     * - name of the property
     */
    name: string;
    /**
     * - test expression that should trigger given breakpoint
     */
    test?: string | undefined;
    /**
     * - human-readable description of a breakpoint
     */
    description?: string | undefined;
    /**
     * - additional condition that has to be truthy for the breakpoint to fire
     */
    condition?: (string | ((arg0: any) => boolean)) | undefined;
    /**
     * - save arguments of each call (defaults to false)
     */
    saveArguments?: boolean | undefined;
    /**
     * - hook up to a property setter instead of getter (which is a default)
     */
    setter?: boolean | undefined;
    /**
     * save full call stack
     */
    fullStack?: boolean | undefined;
    /**
     * pause debugger on hit
     */
    pauseDebugger?: boolean | undefined;
    /**
     * custom capturing function
     */
    customCapture?: (string | ((arg0: any) => unknown)) | undefined;
};
