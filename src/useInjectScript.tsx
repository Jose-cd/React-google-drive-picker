import { useEffect, useState } from 'react'
// const url = 'https://apis.google.com/js/api.js';

type InjectorType = 'init' | 'loading' | 'loaded' | 'error'
interface InjectorState {
  queue: Record<string, ((e: boolean) => void)[]>
  injectorMap: Record<string, InjectorType>
  scriptMap: Record<string, HTMLScriptElement>
}

const injectorState: InjectorState = {
  queue: {},
  injectorMap: {},
  scriptMap: {},
}

type StateType = {
  loaded: boolean
  error: boolean
}

export default function useInjectScript(url: string): [boolean, boolean] {
  const [state, setState] = useState<StateType>({
    loaded: false,
    error: false,
  })

  useEffect(() => {
    if (!injectorState.injectorMap?.[url]) {
      injectorState.injectorMap[url] = 'init'
    }
    // check if the script is already cached
    if (injectorState.injectorMap[url] === 'loaded') {
      setState({
        loaded: true,
        error: false,
      })
      return
    }

    // check if the script already errored
    if (injectorState.injectorMap[url] === 'error') {
      setState({
        loaded: true,
        error: true,
      })
      return
    }

    const onScriptEvent = (error: boolean) => {
      // Get all error or load functions and call them
      if (error) console.log('error loading the script')
      injectorState.queue?.[url]?.forEach((job) => job(error))

      if (error && injectorState.scriptMap[url]) {
        injectorState.scriptMap?.[url]?.remove()
        injectorState.injectorMap[url] = 'error'
      } else injectorState.injectorMap[url] = 'loaded'
      delete injectorState.scriptMap[url]
    }

    const stateUpdate = (error: boolean) => {
      setState({
        loaded: true,
        error,
      })
    }

    if (!injectorState.scriptMap?.[url]) {
      injectorState.scriptMap[url] = document.createElement('script')
      if (injectorState.scriptMap[url]) {
        injectorState.scriptMap[url].src = url
        injectorState.scriptMap[url].async = true
        // append the script to the body
        document.body.append(injectorState.scriptMap[url] as Node)
        injectorState.scriptMap[url].addEventListener('load', () =>
          onScriptEvent(false)
        )
        injectorState.scriptMap[url].addEventListener('error', () =>
          onScriptEvent(true)
        )
        injectorState.injectorMap[url] = 'loading'
      }
    }

    if (!injectorState.queue?.[url]) {
      injectorState.queue[url] = [stateUpdate]
    } else {
      injectorState.queue?.[url]?.push(stateUpdate)
    }

    // remove the event listeners
    return () => {
      //checks the main injector instance
      //prevents Cannot read property 'removeEventListener' of null in hot reload
      if (!injectorState.scriptMap[url]) return
      injectorState.scriptMap[url]?.removeEventListener('load', () =>
        onScriptEvent(true)
      )
      injectorState.scriptMap[url]?.removeEventListener('error', () =>
        onScriptEvent(true)
      )
    }
  }, [url])

  return [state.loaded, state.error]
}
