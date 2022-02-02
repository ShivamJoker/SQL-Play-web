/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_SQL_SYNTAX_FILE_URL: string;
  readonly VITE_APP_DB_FILE : string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}