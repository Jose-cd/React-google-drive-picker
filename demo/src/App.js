import logo from './logo.svg';
import './App.css';
import DrivePicker from 'react-google-drive-picker'
function App() {
  const [openPicker] = DrivePicker();

  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => openPicker()}>Open picker</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
