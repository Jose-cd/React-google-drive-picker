import { useEffect, useState } from "react";

const url = "https://apis.google.com/js/api.js" ;

const queue: any[] = [] ;
let injector: "init"|"loading"|"loaded"|"error" = "init" ;
let script: any = null ;

export function useInjectScript(): [boolean, boolean] {
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
    if (injector === "loaded") {
      setState({
        loaded: true,
        error: false
      });
      return ;
    }

    // check if the script already errored
    if (injector === "error") {
      setState({
        loaded: true,
        error: true
      });
      return ;
    }

    const onScriptEvent = (error: boolean) => {
      // Get all error or load functions and call them
      if(error) console.log("error loading the script");
      queue.forEach(job => job()) ;

      if(error && script !== null) {
        script.remove();
        injector = "error" ;
      }
      else
        injector = "loaded" ;
    }

    const state = (error: boolean) => {
      setState({
        loaded: true,
        error
      });
    };

    if(script === null) {
      script = document.createElement("script");
      script.src = url;
      script.async = true;
      // append the script to the body
      document.body.appendChild(script);
      script.addEventListener("load", () => onScriptEvent(false));
      script.addEventListener("error", () => onScriptEvent(true));
      injector = "loading" ;
    }

    queue.push(state) ;

    // remove the event listeners
    return () => {
        console.log(`injector=${injector}`) ;
        script.removeEventListener("load", onScriptEvent);
        script.removeEventListener("error", onScriptEvent);
        script = null ;
    };
  }, [url]);

  return [state.loaded, state.error];
}
