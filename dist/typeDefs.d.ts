export declare type CallbackDoc = {
    downloadUrl?: string;
    uploadState?: string;
    description: string;
    driveSuccess: boolean;
    embedUrl: string;
    iconUrl: string;
    id: string;
    isShared: boolean;
    lastEditedUtc: number;
    mimeType: string;
    name: string;
    rotation: number;
    rotationDegree: number;
    serviceId: string;
    sizeBytes: number;
    type: string;
    url: string;
};
export declare type PickerCallback = {
    action: string;
    docs: CallbackDoc[];
};
export declare type authResult = {
    access_token: string;
    authuser: string;
    client_id: string;
    cookie_policy: string;
    expires_at: string;
    expires_in: string;
    issued_at: string;
    login_hint: string;
    response_type: string | undefined;
    scope: string;
    session_state: null;
    status: {
        signed_in: boolean;
        method: string;
        google_logged_in: boolean;
    };
    token_type: string;
    error: boolean | undefined;
};
declare type ViewIdOptions = 'DOCS' | 'DOCS_IMAGES' | 'DOCS_IMAGES_AND_VIDEOS' | 'DOCS_VIDEOS' | 'DOCUMENTS' | 'DRAWINGS' | 'FOLDERS' | 'FORMS' | 'PDFS' | 'SPREADSHEETS';
export declare type PickerConfiguration = {
    clientId: string;
    developerKey: string;
    viewId?: ViewIdOptions;
    viewMimeTypes?: string;
    setIncludeFolders?: boolean;
    setSelectFolderEnabled?: boolean;
    disableDefaultView?: boolean;
    token?: string;
    multiselect?: boolean;
    disabled?: boolean;
    appId?: string;
    supportDrives?: boolean;
    showUploadView?: boolean;
    showUploadFolders?: boolean;
    setParentFolder?: string;
    customViews?: any[];
    locale?: string;
    customScopes?: string[];
    callbackFunction: (data: PickerCallback) => any;
};
export declare const defaultConfiguration: PickerConfiguration;
export {};
//# sourceMappingURL=typeDefs.d.ts.map