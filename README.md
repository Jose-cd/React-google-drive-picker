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
import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

function App() {
  const [openPicker, data, authResponse] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
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
      // customViews: customViewsArray, // custom view
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
      <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default App;
```

## Picker configuration props

## Picker Props

| params                 | value                    | default value                                      | description                                                                                                                                                       |
| ---------------------- | ------------------------ | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientId               | string                   | REQUIRED                                           | Google client id                                                                                                                                                  |
| developerKey           | string                   | REQUIRED                                           | Google developer key                                                                                                                                              |
| disableDefaultView     | boolean                  | false                                              | disables default view                                                                                                                                             |
| viewId                 | string                   | DOCS                                               | ViewIdOptions                                                                                                                                                     |
| viewMimeTypes          | string                   | optional                                           | Comma separated mimetypes. Use this in place of viewId if you need to filter multiple type of files. list: https://developers.google.com/drive/api/v3/mime-types. |
| setIncludeFolders      | boolean                  | false                                              | Show folders in the view items.                                                                                                                                   |
| setSelectFolderEnabled | boolean                  | false                                              | Allows the user to select a folder in Google Drive.                                                                                                               |
| token                  | string                   | optional                                           | access_token to skip auth part                                                                                                                                    |
| multiselect            | boolean                  | false                                              | Enable picker multiselect                                                                                                                                         |
| supportDrives          | boolean                  | false                                              | Support shared drives                                                                                                                                             |
| showUploadView         | boolean                  | false                                              | Enable upload view                                                                                                                                                |
| showUploadFolders      | boolean                  | false                                              | Enable folder selection(upload)                                                                                                                                   |
| setParentFolder        | string                   | disabled                                           | Drive folder id to upload                                                                                                                                         |
| customViews            | ViewClass[]              | optional                                           | Array of custom views you want to add to the picker                                                                                                               |
| customScopes           | string[]                 | ['https://www.googleapis.com/auth/drive.readonly'] | Array of custom scopes you want to add to the picker                                                                                                              |
| locale                 | string                   | en                                                 | List of supported locales https://developers.google.com/picker/docs#i18n                                                                                          |
| onPreBuild             | (picker: Picker) => void | false                                              | Optional callback with access to the picker instance                                                                                                              |

## viewId options

| option                 | description                       |
| ---------------------- | --------------------------------- |
| DOCS                   | All Google Drive document types.  |
| DOCS_IMAGES            | Google Drive photos.              |
| DOCS_IMAGES_AND_VIDEOS | Google Drive photos and videos.   |
| DOCS_VIDEOS            | Google Drive videos.              |
| DOCUMENTS              | Google Drive Documents.           |
| FOLDERS                | Google Drive Folders.             |
| DRAWINGS               | Google Drive Drawings.            |
| FORMS                  | Google Drive Forms.               |
| PDFS                   | PDF files stored in Google Drive. |
| SPREADSHEETS           | Google Drive Spreadsheets.        |

## Author

[@Jose medina](https://www.linkedin.com/in/jos%C3%A9-medina-56479a128/)

## Acknowledgments

Inspiration, code snippets

- [sdoomz](https://github.com/sdoomz/react-google-picker)
- [obonyojimmy](https://github.com/obonyojimmy/react-drive-picker#readme)
