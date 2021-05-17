import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let google: any;

function App() {
  const [openPicker, data] = useDrivePicker();
  const handleOpenPicker = () => {
    const customView = [new google.picker.DocsView()];
    openPicker({
      clientId:
        "1083447939024-dqpa47vi26h23psatvfh0vepb21crm75.apps.googleusercontent.com",
      developerKey: "AIzaSyCVCEd0GFFSbj3qe9AU6PUTjx1qaPdF8_g",
      viewId: "DOCS",
      viewMimeTypes: "application/vnd.google-apps.spreadsheet",
      customViews: customView,
      // token:
      //   "ya29.a0AfH6SMA2TJQYdy2Xc-l9nbgdEccsldwza_EsT2nY4LCvuExo5R34DqVGWNPZzxoImpX_m7gQ5sS7cumvHpWSCGi5OU1BG3JSAis2a2nAkiLe5soUzOoBIqin9MxO036fh7c5d4OLCEFKvwwxtsgNukPDO7_evg", // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
    });
  };

  useEffect(() => {
    // do anything with the selected/uploaded files
    if (data) {
      data.docs.map((i) => console.log(i.name));
    }
  }, [data]);

  return (
    <div>
      <button onClick={handleOpenPicker}>Open Picker</button>
    </div>
  );
}

export default App;
