import useDrivePicker from 'react-google-drive-picker'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let google: any

function App() {
  const [openPicker, authResult] = useDrivePicker()
  const [openPicker2] = useDrivePicker()

  console.log(authResult)

  const handleOpenPicker = () => {
    const customViews = [
      new google.picker.DocsView()
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true),
    ]
    openPicker({
      clientId: process.env.REACT_APP_CLIENT_ID!,
      developerKey: process.env.REACT_APP_DEVELOPER_KEY!,
      viewId: 'DOCUMENTS',
      viewMimeTypes: 'application/vnd.google-apps.spreadsheet',
      setIncludeFolders: true,
      setSelectFolderEnabled: true,
      // customViews: customView,
      token: "ya29.a0ARrdaM8VcMdbuM48D-xPTSgAKXUa3yEwRbALdtBkfpTtc-jOozTufJRjqlUm61R2JXyajVocYsl5mZZ03LkRkmukCTpzwg4OLzavhgc-hqm18ky6TvUDWz9SUTV_8vCrXVFU2fQNQKyGb_Z_ViPl7buVW8DKqQ",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      customScopes: ['https://www.googleapis.com/auth/gmail.readonly'],
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }

  const handleOpenPicker2 = () => {
    openPicker2({
      clientId: process.env.REACT_APP_CLIENT_ID!,
      developerKey: process.env.REACT_APP_DEVELOPER_KEY!,
      viewId: 'DOCUMENTS',
      viewMimeTypes: 'application/vnd.google-apps.spreadsheet',
      setIncludeFolders: true,
      setSelectFolderEnabled: true,
      // token: token
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        console.log(data)
      },
    })
  }

  return (
    <div>
      <button onClick={handleOpenPicker}>Open Picker</button>
      <button onClick={handleOpenPicker2}>Open Picker</button>
    </div>
  )
}

export default App
