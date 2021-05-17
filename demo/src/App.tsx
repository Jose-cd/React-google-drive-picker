import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let google: any;

function App() {
  const [openPicker, data] = useDrivePicker();
  const handleOpenPicker = () => {
    const customViews = [
      new google.picker.DocsView()
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true),
    ];
    openPicker({
      clientId: "xxxxxxxxxxxxxx",
      developerKey: "xxxxxxxxxx",
      viewId: "DOCUMENTS",
      viewMimeTypes: "application/vnd.google-apps.spreadsheet",
      setIncludeFolders: true,
      setSelectFolderEnabled: true,
      // customViews: customView,
      // token: token
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
