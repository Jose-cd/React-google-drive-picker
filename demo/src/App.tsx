import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let google: any;

function App() {
  const [openPicker, data] = useDrivePicker();
  const [openPicker2, data2] = useDrivePicker();

  const handleOpenPicker = () => {
    const customViews = [
      new google.picker.DocsView()
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true),
    ];
    openPicker({
      clientId: "xxxxxxxxxxxx",
      developerKey: "xxxxxxxxxxxx",
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

  const handleOpenPicker2 = () => {
    const customViews = [
      new google.picker.DocsView()
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true),
    ];
    openPicker2({
      clientId: "xxxxxxxxxxxx",
      developerKey: "xxxxxxxxxxxx",
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
      console.log("from picker 1");
      data.docs.map((i) => console.log(i.name));
    }
    if (data2) {
      console.log("from picker 2");
      data2.docs.map((i) => console.log(i.name));
    }
  }, [data, data2]);

  return (
    <div>
      <button onClick={handleOpenPicker}>Open Picker</button>
      <button onClick={handleOpenPicker2}>Open Picker</button>
    </div>
  );
}

export default App;
