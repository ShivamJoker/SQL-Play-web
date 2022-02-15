import {get, set} from 'idb-keyval';
import sqlSyntaxes, { FetchSQLData } from '~types/sqlSyntaxes';


const getSQLData = async (): Promise<sqlSyntaxes[]> => {
  
  try {
    
    const dbData = await get('commands');
    
    if(dbData){
      return dbData;
    }
    const response = await fetch(import.meta.env.VITE_APP_SQL_SYNTAX_FILE_URL);

    const commands = await response.json();

    const data = commands.map((cmd: FetchSQLData) => {
      const item: sqlSyntaxes = {
        label: cmd.title,
        documentation: `${cmd.description}\n\n# Syntax:\n${Array.isArray(cmd.syntax) ? cmd.syntax.join('\n') : cmd.syntax}\n\n${cmd.example ? `# Example:\n${cmd.example}` : ''}`,
        insertText: Array.isArray(cmd.syntax) ? cmd.syntax[0] : cmd.syntax,
        ...cmd
      }
      return item;
    })
    await set('commands', data);

    return data;
  } catch (error) {
    throw error;
  }
}

export default getSQLData;