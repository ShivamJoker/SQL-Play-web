import { get, set } from "idb-keyval";
import sqlJS, { Database } from "sql.js";

import wasmBinding from "sql.js/dist/sql-wasm.wasm?url";

let db: Database;

const init = async (data?: Uint8Array) => {
  const sqlPromise = sqlJS({
    locateFile: (file) => wasmBinding,
  });

  try {
    if (!data) {
      const dataPromise = fetch(import.meta.env.VITE_APP_DB_FILE).then((res) =>
        res.arrayBuffer()
      );

      const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
      db = new SQL.Database(new Uint8Array(buf));
    } else {
      const SQL = await sqlPromise;
      db = new SQL.Database(data);
    }
  } catch (error) {
    console.log("error in initializing db", error);
  }
};

(async () => {
  const existingDBBlob: Blob | undefined = await get("database");
  const existingDatabase = await existingDBBlob?.arrayBuffer();

  const dbInitFunction = (db: void) => {
    db = db;
  };

  if (existingDatabase) {
    const data = new Uint8Array(existingDatabase as ArrayBufferLike);
    data ? init(data).then(dbInitFunction) : init().then(dbInitFunction);
  } else {
    init().then(dbInitFunction);
  }
})();

export const execCmd = (text: string) => (db ? db.exec(text) : undefined);

export const saveDBState = () => {
  const database = db.export();
  const blob = new Blob([database]);
  set("database", blob);
};
