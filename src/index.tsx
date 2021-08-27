// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let google: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;
import { useEffect, useState } from "react";
import {
  Picker,
  authResult,
  defaultConfiguration,
  PickerCallback,
  PickerConfiguration,
} from "./typeDefs";
import { useInjectScript } from "./useInjectScript";

export default function useDrivePicker(): [
  (config: PickerConfiguration) => boolean | undefined,
  PickerCallback | undefined,
  authResult | undefined
] {
  const defaultScopes = ["https://www.googleapis.com/auth/drive.readonly"];
  const [loaded, error] = useInjectScript();
  const [pickerApiLoaded, setpickerApiLoaded] = useState(false);
  const [callBackInfo, setCallBackInfo] = useState<PickerCallback>();
  const [openAfterAuth, setOpenAfterAuth] = useState(false);
  const [authWindowVisible, setAuthWindowVisible] = useState(false);
  const [config, setConfig] =
    useState<PickerConfiguration>(defaultConfiguration);
  const [authRes, setAuthRes] = useState<authResult>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let picker: Picker;

  // get the apis from googleapis
  useEffect(() => {
    if (loaded && !error && !pickerApiLoaded) {
      loadApis();
    }
  }, [loaded, error, pickerApiLoaded]);

  // use effect to open picker after auth
  useEffect(() => {
    if (openAfterAuth && config.token && loaded && !error && pickerApiLoaded) {
      createPicker(config);
      setOpenAfterAuth(false);
    }
  }, [openAfterAuth, config.token, loaded, error, pickerApiLoaded]);

  // open the picker
  const openPicker = (config: PickerConfiguration) => {
    // global scope given conf
    setConfig(config);

    // if we didnt get token generate token.
    if (!config.token) {
      setAuthWindowVisible(true);
    }

    // if we have token and everything is loaded open the picker
    if (config.token && loaded && !error && pickerApiLoaded) {
      return createPicker(config);
    }
  };

  // load the Drive picker api
  const loadApis = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.gapi.load("auth");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.gapi.load("picker", { callback: onPickerApiLoad });
  };

  const onPickerApiLoad = () => {
    setpickerApiLoaded(true);
  };

  // Open auth window after given config state is ready
  useEffect(() => {
    if (authWindowVisible) {
      window.gapi.auth.authorize(
        {
          client_id: config.clientId,
          scope: config.customScopes
            ? [...defaultScopes, ...config.customScopes]
            : defaultScopes,
          immediate: false,
        },
        handleAuthResult
      );
    }
  }, [authWindowVisible]);

  const handleAuthResult = (authResult: authResult) => {
    setAuthWindowVisible(false);
    if (authResult && !authResult.error) {
      setAuthRes(authResult);
      setConfig((prev) => ({ ...prev, token: authResult.access_token }));
      setOpenAfterAuth(true);
    }
  };

  const createPicker = ({
    token,
    appId = "",
    supportDrives = false,
    developerKey,
    viewId = "DOCS",
    disabled,
    multiselect,
    showUploadView = false,
    showUploadFolders,
    setParentFolder = "",
    viewMimeTypes,
    customViews,
    locale = "en",
    setIncludeFolders,
    setSelectFolderEnabled,
    disableDefaultView = false,
    onPreBuild,
  }: PickerConfiguration) => {
    if (disabled) return false;

    const view = new google.picker.DocsView(google.picker.ViewId[viewId]);
    if (viewMimeTypes) view.setMimeTypes(viewMimeTypes);
    if (setIncludeFolders) view.setSelectFolderEnabled(true);
    if (setSelectFolderEnabled) view.setSelectFolderEnabled(true);

    const uploadView = new google.picker.DocsUploadView();
    if (showUploadFolders) uploadView.setIncludeFolders(true);
    if (setParentFolder) uploadView.setParent(setParentFolder);

    picker = new google.picker.PickerBuilder()
      .setAppId(appId)
      .setOAuthToken(token)
      .setDeveloperKey(developerKey)
      .setCallback(pickerCallback)
      .setLocale(locale);

    if (!disableDefaultView) {
      picker.addView(view);
    }

    if (customViews) {
      customViews.map((view) => picker.addView(view));
    }

    if (multiselect) {
      picker.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
    }

    if (showUploadView) picker.addView(uploadView);

    if (supportDrives) {
      picker.enableFeature(google.picker.Feature.SUPPORT_DRIVES);
    }
    if (onPreBuild) onPreBuild(picker);
    picker.build().setVisible(true);
    return true;
  };

  // A simple callback implementation.
  const pickerCallback = (data: PickerCallback) => {
    if (data.action === google.picker.Action.PICKED) {
      setCallBackInfo(data);
    }
  };

  return [openPicker, callBackInfo, authRes];
}
