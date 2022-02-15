import { get, set } from 'idb-keyval';
import sqlJS, { Database } from 'sql.js';
let db: Database;


const init = async (data?: Uint8Array) => {
  
  const sqlPromise = sqlJS({ locateFile: file => `https://sql.js.org/dist/${file}` });
  
  if(!data){
    const dataPromise = fetch(import.meta.env.VITE_APP_DB_FILE).then(res => res.arrayBuffer());
    
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
    return db = new SQL.Database(new Uint8Array(buf));
  } else {
    const SQL = await sqlPromise;
    return db = new SQL.Database(data);
  }
}


(async () => {
  const existingDBBlob: Blob | undefined = await get('database');
  const existingDatabase = await existingDBBlob?.arrayBuffer();
  const data = new Uint8Array(existingDatabase as ArrayBufferLike);
  init(data).then((db) => {
    db = db;
  });
})()

export const execCmd = (text:string) => db ? db.exec(text) : undefined;


export const saveDBState = () => {
  const database = db.export();
  const blob = new Blob([database]);
  set('database', blob);
  console.log('saved')
}