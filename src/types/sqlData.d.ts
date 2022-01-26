interface SQLData {
  label: string,
  documentation: string,
  insertText: string,
}

export interface FetchSQLData {
  title: string,
  description: string,
  tag: string,
  syntax: string,
  example?: string[],
  id: string,
}

export default SQLData;