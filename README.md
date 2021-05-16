# React-google-drive-picker

Google drive picker

## Description

Google drive picker custom hook.

## Getting Started

### Installing

With npm
```
npm i react-google-drive-picker
```
With yarn
```
yarn add react-google-drive-picker
```

### Usage

```js
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
```


## Picker configuration props

## Picker Props

|    params        |   value  |  default value   |          description          |
|------------------|----------|------------------|-------------------------------|
|    clientId      |  string  |     REQUIRED     |      google client id         |
|    developerKey  |  string  |     REQUIRED     |      google developer key     |
|    viewId        |  string  |     REQUIRED     |         ViewIdOptions         |
|   token          |  string  |     Optional     | access_token to skip auth part|
|  multiselect     |  boolean |     false        | enable picker multiselect     |
| supportDrives    |  boolean |     false        |    support shared drives      |
| showUploadView   |  boolean |     false        |     enable upload view        |
| showUploadFolders|  boolean |     false        |enable folder selection(upload)|
| setParentFolder  |  string  |     disabled     |  Drive folder id to upload    |


  ## viewId options
|    option            |         description             |
|----------------------|---------------------------------|
|    "DOCS"            |All Google Drive document types. |
|  "DOCS_IMAGES"          |Google Drive photos.             
|"DOCS_IMAGES_AND_VIDEOS" |Google Drive photos and videos.  |
|    "DOCS_VIDEOS"        |Google Drive videos.             |
|    "DOCUMENTS"          |	Google Drive Documents.         |
|    "FOLDERS"            |Google Drive Folders.            |
|    "DRAWINGS"           |Google Drive Drawings.           |
|    "FORMS"              |	Google Drive Forms.             |
|    "PDFS"               |PDF files stored in Google Drive.|
|    "SPREADSHEETS"       |Google Drive Spreadsheets.       |

## Picker Props


## Author

[@Jose medina](https://www.linkedin.com/in/jos%C3%A9-medina-56479a128/)


## Acknowledgments
Inspiration, code snippets
* [sdoomz](https://github.com/sdoomz/react-google-picker)
* [obonyojimmy](https://github.com/obonyojimmy/react-drive-picker#readme)