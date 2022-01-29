/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_SQL_SYNTAX_FILE_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}