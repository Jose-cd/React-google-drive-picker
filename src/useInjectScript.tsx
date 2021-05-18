import { useEffect, useState } from "react";

const cachedScripts: string[] = [];
let loaded = 'no' ;
let script: any = null ;
let listenerCount = 0 ;

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
    if (loaded === 'yes') {
      setState({
        loaded: true,
        error: false,
      });
      return ;
    }

    if(script === null) {
      script = document.createElement("script");
      script.src = url;
      script.async = true;
    }

    const onScriptLoad = () => {
      cachedScripts.push(url);
      loaded = 'yes' ;
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

      listenerCount++ ;
      script.addEventListener("load", onScriptLoad);
      script.addEventListener("error", onScriptError);

    if (loaded === 'no') {
      // append the script to the body
      document.body.appendChild(script);
      loaded = 'loading' ;
    }

    // remove the event listeners and reset script tag
    return () => {
      script.removeEventListener("load", onScriptLoad);
      script.removeEventListener("error", onScriptError);
      if(--listenerCount === 0)
        script = null ;
    };
  }, [url]);

  return [state.loaded, state.error];
}
