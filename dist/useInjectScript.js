"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInjectScript = void 0;
var react_1 = require("react");
var url = 'https://apis.google.com/js/api.js';
var queue = [];
var injector = 'init';
var script = null;
function useInjectScript() {
    var _a = (0, react_1.useState)({
        loaded: false,
        error: false,
    }), state = _a[0], setState = _a[1];
    (0, react_1.useEffect)(function () {
        // check if the script is already cached
        if (injector === 'loaded') {
            setState({
                loaded: true,
                error: false,
            });
            return;
        }
        // check if the script already errored
        if (injector === 'error') {
            setState({
                loaded: true,
                error: true,
            });
            return;
        }
        var onScriptEvent = function (error) {
            // Get all error or load functions and call them
            if (error)
                console.log('error loading the script');
            queue.forEach(function (job) { return job(); });
            if (error && script !== null) {
                script.remove();
                injector = 'error';
            }
            else
                injector = 'loaded';
            script = null;
        };
        var state = function (error) {
            setState({
                loaded: true,
                error: error,
            });
        };
        if (script === null) {
            script = document.createElement('script');
            script.src = url;
            script.async = true;
            // append the script to the body
            document.body.appendChild(script);
            script.addEventListener('load', function () { return onScriptEvent(false); });
            script.addEventListener('error', function () { return onScriptEvent(true); });
            injector = 'loading';
        }
        queue.push(state);
        // remove the event listeners
        return function () {
            //checks the main injector instance
            //prevents Cannot read property 'removeEventListener' of null in hot reload
            if (!script)
                return;
            script.removeEventListener('load', onScriptEvent);
            script.removeEventListener('error', onScriptEvent);
        };
    }, [url]);
    return [state.loaded, state.error];
}
exports.useInjectScript = useInjectScript;
//# sourceMappingURL=useInjectScript.js.map