import Editor, { OnChange, OnMount, useMonaco } from '@monaco-editor/react';
import '@styles/Editor/index.scss';
import { useEffect, useState } from 'react';
import { editor, IRange, languages } from 'monaco-editor';
import getSQLData from '@utils/getSQLData';
import sqlSyntaxes from '~types/sqlSyntaxes';
import ControlBox from './ControlBox';
import { QueryExecResult } from 'sql.js';
import {nanoid} from 'nanoid';
import ResultsTable from './ResultsTable';

const SQLEditor = () => {
  const monaco = useMonaco();
  const [sqlSyntaxes, setSQLData] = useState<sqlSyntaxes[] | undefined>();
  const [monacoEditor, setMonacoEditor] = useState<editor.IStandaloneCodeEditor>();
  const [editorText, setEditorText] = useState<string>();
  const [sqlResults, setSQLResults] = useState<QueryExecResult[]>();

  useEffect(() => {
    getSQLData().then((data) => setSQLData(data))
  }, []);

  useEffect(() => {
    if (!monaco?.languages) return;

    const createDependencyProposals = (
      
      range: IRange

    ): languages.CompletionItem[] => {
        if(sqlSyntaxes){
          return sqlSyntaxes.map((item) => {
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
    if(sqlSyntaxes){
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
  }, [monaco, sqlSyntaxes]);

  useEffect(() => {
    if(monaco?.languages && monacoEditor){
      monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        const runSQLButton = document.querySelector<HTMLButtonElement>('button#run-sql-button');

        runSQLButton?.classList.add('focusing');
        runSQLButton?.click();

        setTimeout(() => runSQLButton?.classList.remove('focusing'), 50);
        
        monacoEditor.focus();

      });
    }
  }, [monaco, monacoEditor])


  // functions

  const onMount: OnMount = (editor) => setMonacoEditor(editor);
  const editorOnChange: OnChange = (text) => setEditorText(text?.trim());

  return (
    <div> {/* empty div for react-split.js */}
      <div className="sql_playground">
        <div className="sql_codearea">
          <div className="sql_codearea__textarea">
            <Editor
              height="200px"
              language="sql"
              onMount={onMount}
              options={{
                minimap: {enabled: false},
                overviewRulerLanes: 0,
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto',
                  verticalScrollbarSize: 0,
                },
                autoIndent: 'full',
              }}
              onChange={editorOnChange}
            />
          </div>
        <ControlBox editorText={editorText ? editorText : ''} onResult={setSQLResults} />
        </div>
        <div className="sql_result_container">
          {sqlResults?.map((table) => (
            <ResultsTable table={table} />  
          ))}
        </div>
      </div>
    </div>
  );
};

export default SQLEditor;