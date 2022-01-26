import {get, set} from 'idb-keyval';
import SQLData, { FetchSQLData } from '~types/sqlData';


const getSQLData = async (): Promise<SQLData[]> => {
  
  try {
    
    const dbData = await get('commands');
    
    if(dbData){
      console.log('using saved database...');
      return dbData;
    }
    const response = await fetch('https://raw.githubusercontent.com/ShivamJoker/SQL-Play/master/src/data/commands.json');
  
    const commands = await response.json();

    let data = commands.map((cmd: FetchSQLData) => {
      const item: SQLData = {
        label: cmd.title,
        documentation: `${cmd.description}\n\n# Syntax:\n${cmd.syntax}\n\n${cmd.example ? `# Example:\n${cmd.example}` : ''}`,
        insertText: cmd.syntax
      }
      return item;
    })
    set('commands', data).then(() => {
      console.log('saved new sql database, loaded from fetch.');
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export default getSQLData;