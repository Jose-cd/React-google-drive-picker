// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let google: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;
import { useEffect, useState } from "react";
import {
  authResult,
  defaultConfiguration,
  PickerCallback,
  PickerConfiguration,
} from "./typeDefs";
import { useInjectScript } from "./useInjectScript";

export default function useDrivePicker(): [
  (config: PickerConfiguration) => boolean | undefined,
  PickerCallback | undefined
] {
  const defaultScopes = ["https://www.googleapis.com/auth/drive.file"];
  const [loaded, error] = useInjectScript();
  const [pickerApiLoaded, setpickerApiLoaded] = useState(false);
  const [callBackInfo, setCallBackInfo] = useState<PickerCallback>();
  const [openAfterAuth, setOpenAfterAuth] = useState(false);
  const [authWindowVisible, setAuthWindowVisible] = useState(false);
  const [config, setConfig] =
    useState<PickerConfiguration>(defaultConfiguration);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let picker: any;

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
          scope: defaultScopes,
          immediate: false,
        },
        handleAuthResult
      );
    }
  }, [authWindowVisible]);

  const handleAuthResult = (authResult: authResult) => {
    setAuthWindowVisible(false);
    if (authResult && !authResult.error) {
      setConfig((prev) => ({ ...prev, token: authResult.access_token }));
      setOpenAfterAuth(true);
    }
  };

  const createPicker = ({
    token,
    appId = "",
    developerKey,
    views,
    features,
    locale = "en",
  }: PickerConfiguration) => {

    picker = new google.picker.PickerBuilder()
      .setAppId(appId)
      .setOAuthToken(token)
      .setDeveloperKey(developerKey)
      .setCallback(pickerCallback)
      .setLocale(locale);

    if (views) {
      console.log(`Dumping views: %o`,views);
      views.map((view) => picker.addView(view));
    }

    if(features)
      features.forEach(feature => picker.enableFeature(google.picker.Feature[feature]))

    picker.build().setVisible(true);
    return true;
  };

  // A simple callback implementation.
  const pickerCallback = (data: PickerCallback) => {
    if (data.action === google.picker.Action.PICKED) {
      setCallBackInfo(data);
    }
  };

  return [openPicker, callBackInfo];
}
