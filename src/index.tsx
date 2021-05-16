import React from "react";
import { useInjectScript} from './useInjectScript'
export default function DrivePicker(): boolean {
	const [loaded, error] = useInjectScript("https://apis.google.com/js/api.js");
	const [pickerApiLoaded, setpickerApiLoaded] = React.useState(false);

	const loadPicker => useCallback(
		() => {
			if(loaded && !error, !pickerApiLoaded){

			}
		},
		[loaded, error,pickerApiLoaded],
	)

	const loadApis = () => {
		// window.gapi.load("auth", {callback: onAuthApiLoad})
		// window.gapi.load("load", {callback: onAuthApiLoad})
	}
	
	return true
}

