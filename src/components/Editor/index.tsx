import Editor, { OnMount, useMonaco } from '@monaco-editor/react';
import '@styles/SQLPlayground/index.scss';
import { useEffect, useState } from 'react';
import { IRange, languages } from 'monaco-editor';
import getSQLData from '@utils/getSQLData';
import SQLData from '~types/sqlData';

const SQLEditor = () => {
  const monaco = useMonaco();
  const [SQLData, setSQLData] = useState<SQLData[] | undefined>();
  
  useEffect(() => {
    getSQLData().then((data) => setSQLData(data))
  }, []);

  useEffect(() => {
    if (!monaco?.languages) return;

    const createDependencyProposals = (
      
      range: IRange

    ): languages.CompletionItem[] => {
        if(SQLData){
          return SQLData.map((item) => {
           return {
             label: item.label,
             documentation: item.documentation,
             insertText: item.insertText,
             range: range,
             kind: monaco.languages.CompletionItemKind.Function,
             insertTextRules:
               monaco?.languages.CompletionItemInsertTextRule.InsertAsSnippet,
           };
         });
        }
        return []
    };
    if(SQLData){
      monaco.languages.registerCompletionItemProvider('sql', {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
  
          const range: IRange = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };
  
          return {
            suggestions: createDependencyProposals(range),
          };
        },
      });

    }
  }, [monaco, SQLData]);

  const onMount: OnMount = (editor) => {
    editor.onKeyDown((event) => {
      if (event.code === 'Enter' && (event.metaKey || event.ctrlKey)) {
        console.log('Ctrl + Enter');
        event.preventDefault();
      }
    });
  };

  return (
    <div className="sql_playground">
      <div className="sql_textarea">
        <Editor
          height="200px"
          language="sql"
          onMount={onMount}
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default SQLEditor;