/*global google*/
import React, { useCallback, useEffect } from "react";
import { useInjectScript} from './useInjectScript'
export default function DrivePicker(): [() => any] {
	const defaultScopes = ["https://www.googleapis.com/auth/drive.file"];
	const [loaded, error] = useInjectScript("https://apis.google.com/js/api.js");
	const [pickerApiLoaded, setpickerApiLoaded] = React.useState(false);
	const [oauthToken, setoauthToken] = React.useState(null);
	const [data, setData] = React.useState()
	const [openAfterAuth, setOpenAfterAuth] = React.useState(false)

	let picker = null;

	// get the apis from googleapis
	useEffect(() => {
		if(loaded && !error && !pickerApiLoaded){
			loadApis()
		}
	}, [loaded, error, pickerApiLoaded])

  // use effect to open picker after auth
	useEffect(() => {
		if(openAfterAuth && oauthToken && loaded && !error && pickerApiLoaded) {
			createPicker()
			setOpenAfterAuth(false)
		}
	}, [openAfterAuth, oauthToken, loaded, error, pickerApiLoaded])

	// open the picker
	const openPicker = () => {
		if(oauthToken && loaded && !error && pickerApiLoaded) {
			return createPicker()
		}

		if(!oauthToken) {
			openAuthWindow();
		}
	}
	
  // load the Drive picker api 
	const loadApis = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		window.gapi.load("auth");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		window.gapi.load("picker", {callback: onPickerApiLoad})
	}

	const onPickerApiLoad = () => {
    setpickerApiLoaded(true);
  };

	const openAuthWindow = () => {
    window.gapi.auth.authorize(
      {
        client_id: "1083447939024-dqpa47vi26h23psatvfh0vepb21crm75.apps.googleusercontent.com",
        scope: defaultScopes,
        immediate: false
      },
      handleAuthResult
    );
  };

	const handleAuthResult = authResult => {
    if (authResult && !authResult.error) {
      setoauthToken(authResult.access_token);
			setOpenAfterAuth(true)
    }
  };


	const createPicker = () => {
		console.log("create picker triggered")
    let view = new google.picker.DocsView(google.picker.ViewId.FOLDERS)
      .setMimeTypes("application/vnd.google-apps.folder")
      .setSelectFolderEnabled(true)
      .setParent("root");
    picker = new google.picker.PickerBuilder()
      .enableFeature(google.picker.Feature.SUPPORT_DRIVES)
			.setAppId("1083447939024-dqpa47vi26h23psatvfh0vepb21crm75.apps.googleusercontent.com")
      .setOAuthToken(oauthToken)
      .addViewGroup(view)
			.setDeveloperKey("AIzaSyCVCEd0GFFSbj3qe9AU6PUTjx1qaPdF8_g")
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  };

	// A simple callback implementation.
	const pickerCallback = data => {
    if (data.action === google.picker.Action.PICKED) {
      setData(data[google.picker.Response.DOCUMENTS]);
    }
  };
	

	

	
	return [openPicker]
}

