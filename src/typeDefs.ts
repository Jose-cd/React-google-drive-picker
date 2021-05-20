export type CallbackDoc = {
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

export type PickerCallback = {
  action: string;
  docs: CallbackDoc[];
};

export type authResult = {
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
  status: { signed_in: boolean; method: string; google_logged_in: boolean };
  token_type: string;
  error: boolean | undefined;
};

export type Features =
  | "MINE_ONLY"
  | "MULTISELECT_ENABLED"
  | "NAV_HIDDEN"
  | "SIMPLE_UPLOAD_ENABLED"
  | "SUPPORT_DRIVES" ;

export type PickerConfiguration = {
  clientId: string;
  developerKey: string;
  token?: string;
  appId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  views: any[];
  features?: Features[];
  locale?: string;
};

export const defaultConfiguration: PickerConfiguration = {
  clientId: "",
  developerKey: "",
  views: [],
  locale: "en"
};
