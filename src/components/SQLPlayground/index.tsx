import Editor, { useMonaco } from "@monaco-editor/react";
import "@styles/SQLPlayground/index.scss";
import sqlData from "@data/sql.json";
import { useEffect } from "react";

function SQLPlayground() {
  const monaco = useMonaco();
  
  function createDependencyProposals (range: any) {
    return sqlData.map((item) => {
      return {
        kind: monaco.languages.CompletionItemKind.Function,
        range: range,
        insertTextRules: monaco?.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        insertText: item.label,
        ...item,
      }
    })
  };

  useEffect(() => {
    
    monaco?.languages.registerCompletionItemProvider('sql', {

      provideCompletionItems: (model:any, position: any) => {
        const word = model.getWordUntilPosition(position);
  
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };
  
        return {
          suggestions: createDependencyProposals(range)
        }
      }
    });

  }, [monaco])

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
