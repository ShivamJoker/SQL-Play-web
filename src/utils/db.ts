import sqlJS, { Database } from 'sql.js';
let db: Database;


const init = async () => {
  
  const sqlPromise = sqlJS({ locateFile: file => `https://sql.js.org/dist/${file}` });
  
  const dataPromise = fetch(import.meta.env.VITE_APP_DB_FILE).then(res => res.arrayBuffer());
  
  const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
  
  return db = new SQL.Database(new Uint8Array(buf));
}

init().then((db) => {
  db = db;
})



export const execCmd = (text:string) => db ? db.exec(text) : undefined;