/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {

  readonly VITE_DROP_CONSOLE: string

  readonly VITE_ENV: string
  
  readonly VITE_BASE_URL: string

  readonly VITE_BASE_API: string

  readonly VITE_APP_ID: string

  readonly VITE_TRACKER_PROJECT: string

  readonly VITE_TRACKER_LOGSTORE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}