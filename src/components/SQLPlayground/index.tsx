import Editor, {EditorProps, useMonaco} from "@monaco-editor/react";
import "@styles/SQLPlayground/index.scss";
import { useEffect } from "react";

function SQLPlayground() {
  const monaco = useMonaco();

  const onMount = (editor: any) => {
    editor.onKeyDown((event: any) => {
      if(event.keyCode === 3 && event.ctrlKey){
        console.log('Ctrl + Enter');
        event.preventDefault()
      }
    })
  }

  return (
    <>
      <div className="sql_playground">
        <div className="sql_textarea">
          <Editor height="200px" language="sql" onMount={onMount} width={"100%"}/>
        </div>
      </div>
    </>
  );
}

export default SQLPlayground;
