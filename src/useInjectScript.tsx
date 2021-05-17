import { useEffect, useState } from "react";

const cachedScripts: string[] = [];

export function useInjectScript(url: string): [boolean, boolean] {
  type stateTypes = {
    loaded: boolean;
    error: boolean;
  };
  const [state, setState] = useState<stateTypes>({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    // check if the script is already cached
    if (cachedScripts.includes(url)) {
      setState({
        loaded: true,
        error: false,
      });
    } else {
      cachedScripts.push(url);
      const script = document.createElement("script");
      script.src = url;
      script.async = true;

      const onScriptLoad = () => {
        console.log("script Loaded");
        setState({
          loaded: true,
          error: false,
        });
      };
      const onScriptError = () => {
        console.log("error loading the script");
        const idx = cachedScripts.indexOf(url);
        if (idx > 0) cachedScripts.splice(idx, 1);
        script.remove();
        setState({
          loaded: true,
          error: true,
        });
      };

      script.addEventListener("load", onScriptLoad);
      script.addEventListener("error", onScriptError);

      // append the script to the body
      document.body.appendChild(script);

      // remove the event listeners
      return () => {
        script.removeEventListener("load", onScriptLoad);
        script.removeEventListener("error", onScriptError);
      };
    }
  }, [url]);

  return [state.loaded, state.error];
}
