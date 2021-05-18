"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInjectScript = void 0;
var react_1 = require("react");
var cachedScripts = [];
var loaded = 'no';
var script = null;
var listenerCount = 0;
function useInjectScript(url) {
    var _a = react_1.useState({
        loaded: false,
        error: false,
    }), state = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        // check if the script is already cached
        if (loaded === 'yes') {
            setState({
                loaded: true,
                error: false,
            });
            return;
        }
        if (script === null) {
            script = document.createElement("script");
            script.src = url;
            script.async = true;
        }
        var onScriptLoad = function () {
            cachedScripts.push(url);
            loaded = 'yes';
            console.log("script Loaded");
            setState({
                loaded: true,
                error: false,
            });
        };
        var onScriptError = function () {
            console.log("error loading the script");
            var idx = cachedScripts.indexOf(url);
            if (idx > 0)
                cachedScripts.splice(idx, 1);
            script.remove();
            setState({
                loaded: true,
                error: true,
            });
        };
        listenerCount++;
        script.addEventListener("load", onScriptLoad);
        script.addEventListener("error", onScriptError);
        if (loaded === 'no') {
            // append the script to the body
            document.body.appendChild(script);
            loaded = 'loading';
        }
        // remove the event listeners and reset script tag
        return function () {
            script.removeEventListener("load", onScriptLoad);
            script.removeEventListener("error", onScriptError);
            if (--listenerCount === 0)
                script = null;
        };
    }, [url]);
    return [state.loaded, state.error];
}
exports.useInjectScript = useInjectScript;
//# sourceMappingURL=useInjectScript.js.map