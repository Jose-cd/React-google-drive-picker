import  { useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker'


function App() {
  const [openPicker, data] = useDrivePicker();  
  const handleOpenPicker = () => {
    openPicker({
      clientId: "xxxxxxxxxxxxxxxxx",
      developerKey: "xxxxxxxxxxxx",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
    })
  }

  useEffect(() => {
    // do anything with the selected/uploaded files
    if(data){
      data.docs.map(i => console.log(i.name))
    }
  }, [data])

  
  return (
    <div>
        <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default App;
