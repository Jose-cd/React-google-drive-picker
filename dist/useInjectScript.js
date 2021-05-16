"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInjectScript = void 0;
var react_1 = require("react");
var cachedScripts = [];
function useInjectScript(url) {
    var _a = react_1.useState({
        loaded: false,
        error: false
    }), state = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        // check if the script is already cached
        if (cachedScripts.includes(url)) {
            console.log("script is cached");
            setState({
                loaded: true,
                error: false
            });
        }
        else {
            console.log("script is not cached");
            cachedScripts.push(url);
            var script_1 = document.createElement("script");
            script_1.src = url;
            script_1.async = true;
            var onScriptLoad_1 = function () {
                console.log("script Loaded");
                setState({
                    loaded: true,
                    error: false
                });
            };
            var onScriptError_1 = function () {
                console.log("error loading the script");
                var idx = cachedScripts.indexOf(url);
                if (idx > 0)
                    cachedScripts.splice(idx, 1);
                script_1.remove();
                setState({
                    loaded: true,
                    error: true
                });
            };
            script_1.addEventListener("load", onScriptLoad_1);
            script_1.addEventListener("error", onScriptError_1);
            // append the script to the body
            document.body.appendChild(script_1);
            // remove the event listeners
            return function () {
                script_1.removeEventListener("load", onScriptLoad_1);
                script_1.removeEventListener("error", onScriptError_1);
            };
        }
    }, [url]);
    return [state.loaded, state.error];
}
exports.useInjectScript = useInjectScript;
//# sourceMappingURL=useInjectScript.js.map