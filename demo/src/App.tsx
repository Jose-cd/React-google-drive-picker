import  { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import useDrivePicker from 'react-google-drive-picker'
function App() {
  const [openPicker, data] = useDrivePicker();
  const token = "ya29.a0AfH6SMAZUIDIl1v4Stl1xqGN_G7flWv5WVnmPhh9HXG_kOCWVsKfBzvGqurVEr8UZFRc56-N37njHJK30xj3Qv_qrsiyK-JgLDYoPdsNATx5YqVNC9bBU1No7xktcDurqW06hqtRrU1ZMxPhhajqiqPRrRQIDw"
  
  const handleOpenPicker = () => {
    openPicker({
      clientId: "1083447939024-dqpa47vi26h23psatvfh0vepb21crm75.apps.googleusercontent.com",
      developerKey: "AIzaSyCVCEd0GFFSbj3qe9AU6PUTjx1qaPdF8_g",
      viewId: "DOCS",
      token: token,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      disabled: true
    })
  }

  useEffect(() => {
    if(data){
      data.docs.map(i => console.log(i.name))
    }
  }, [data])

  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => handleOpenPicker()}>Open Picker</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
