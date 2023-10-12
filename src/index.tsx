// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let google: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any
import { useEffect, useState } from 'react'
import {
  authResult,
  defaultConfiguration,
  PickerConfiguration,
} from './typeDefs'
import useInjectScript from './useInjectScript'

export default function useDrivePicker(): [
  (config: PickerConfiguration) => boolean | undefined,
  authResult | undefined
] {
  const defaultScopes = ['https://www.googleapis.com/auth/drive.readonly']
  const [loaded, error] = useInjectScript('https://apis.google.com/js/api.js')
  const [loadedGsi, errorGsi] = useInjectScript(
    'https://accounts.google.com/gsi/client'
  )
  const [pickerApiLoaded, setpickerApiLoaded] = useState(false)
  const [openAfterAuth, setOpenAfterAuth] = useState(false)
  const [authWindowVisible, setAuthWindowVisible] = useState(false)
  const [config, setConfig] =
    useState<PickerConfiguration>(defaultConfiguration)
  const [authRes, setAuthRes] = useState<authResult>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let picker: any

  // get the apis from googleapis
  useEffect(() => {
    if (loaded && !error && loadedGsi && !errorGsi && !pickerApiLoaded) {
      loadApis()
    }
  }, [loaded, error, loadedGsi, errorGsi, pickerApiLoaded])

  // use effect to open picker after auth
  useEffect(() => {
    if (
      openAfterAuth &&
      config.token &&
      loaded &&
      !error &&
      loadedGsi &&
      !errorGsi &&
      pickerApiLoaded
    ) {
      createPicker(config)
      setOpenAfterAuth(false)
    }
  }, [
    openAfterAuth,
    config.token,
    loaded,
    error,
    loadedGsi,
    errorGsi,
    pickerApiLoaded,
  ])

  // open the picker
  const openPicker = (config: PickerConfiguration) => {
    // global scope given conf
    setConfig(config)

    // if we didnt get token generate token.
    if (!config.token) {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: config.clientId,
        scope: (config.customScopes ? config.customScopes : defaultScopes).join(
            ' '
        ),
        callback: (tokenResponse: authResult) => {
          setAuthRes(tokenResponse)
          createPicker({ ...config, token: tokenResponse.access_token })
        },
      })

      client.requestAccessToken()
    }

    // if we have token and everything is loaded open the picker
    if (config.token && loaded && !error && pickerApiLoaded) {
      return createPicker(config)
    }
  }

  // load the Drive picker api
  const loadApis = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.gapi.load('auth')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.gapi.load('picker', { callback: onPickerApiLoad })
  }

  const onPickerApiLoad = () => {
    setpickerApiLoaded(true)
  }

  const createPicker = ({
    token,
    appId = '',
    supportDrives = false,
    developerKey,
    viewId = 'DOCS',
    disabled,
    multiselect,
    setOrigin,
    showUploadView = false,
    showUploadFolders,
    setParentFolder = '',
    viewMimeTypes,
    customViews,
    locale = 'en',
    setIncludeFolders,
    setSelectFolderEnabled,
    disableDefaultView = false,
    callbackFunction,
  }: PickerConfiguration) => {
    if (disabled) return false

    const view = new google.picker.DocsView(google.picker.ViewId[viewId])
    if (viewMimeTypes) view.setMimeTypes(viewMimeTypes)
    if (setIncludeFolders) view.setIncludeFolders(true)
    if (setSelectFolderEnabled) view.setSelectFolderEnabled(true)

    const uploadView = new google.picker.DocsUploadView()
    if (viewMimeTypes) uploadView.setMimeTypes(viewMimeTypes)
    if (showUploadFolders) uploadView.setIncludeFolders(true)
    if (setParentFolder) uploadView.setParent(setParentFolder)
    if (setParentFolder) view.setParent(setParentFolder)

    picker = new google.picker.PickerBuilder()
      .setAppId(appId)
      .setOAuthToken(token)
      .setDeveloperKey(developerKey)
      .setLocale(locale)
      .setCallback(callbackFunction)

    if (setOrigin) {
      picker.setOrigin(setOrigin)
    }

    if (!disableDefaultView) {
      picker.addView(view)
    }

    if (customViews) {
      customViews.map((view) => picker.addView(view))
    }

    if (multiselect) {
      picker.enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
    }

    if (showUploadView) picker.addView(uploadView)

    if (supportDrives) {
      picker.enableFeature(google.picker.Feature.SUPPORT_DRIVES)
    }

    picker.build().setVisible(true)
    return true
  }

  return [openPicker, authRes]
}
