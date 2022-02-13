import Editor, { OnChange, OnMount, useMonaco } from '@monaco-editor/react';
import '@styles/Editor/index.scss';
import { useContext, useEffect, useState } from 'react';
import * as monacoModule from 'monaco-editor';
import getSQLData from '@utils/getSQLData';
import sqlSyntaxes from '~types/sqlSyntaxes';
import ControlBox from './ControlBox';
import { QueryExecResult } from 'sql.js';
import ResultsTable from './ResultsTable';
import { AppContext } from '@contexts/AppContext';
import { v4 } from 'uuid';

const SQLEditor = () => {
  const monaco = useMonaco();
  const [sqlSyntaxes, setSQLData] = useState<sqlSyntaxes[] | undefined>();
  const [monacoEditor, setMonacoEditor] = useState<monacoModule.editor.IStandaloneCodeEditor>();
  const [editorText, setEditorText] = useState<string>();
  const [sqlResults, setSQLResults] = useState<QueryExecResult[]>();
  const {state: {editorText: newEditorText, theme}, dispatch} = useContext(AppContext);

  useEffect(() => {
    getSQLData().then((data) => setSQLData(data))
  }, []);


  useEffect(() => {
    if(newEditorText.length && monacoEditor) {
      monacoEditor.setValue(newEditorText);
    }
  }, [newEditorText, monacoEditor]);

  useEffect(() => {
    if (!monaco?.languages) return;

    const createDependencyProposals = (
      
      range: monacoModule.IRange

    ): monacoModule.languages.CompletionItem[] => {
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
  
          const range: monacoModule.IRange = {
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

  useEffect(() => {
    dispatch({type: 'update_editor_text', text: 'SELECT * from employees'})
  }, []);

  // functions

  const onMount: OnMount = (editor) => setMonacoEditor(editor);
  const editorOnChange: OnChange = (text) => setEditorText(text?.trim());

  return (
    <div> {/* empty div for react-split.js */}
      <div className="sql_playground">
        <div className="code_container">
          <div className="code_container__textarea">
            <Editor
              height="200px"
              language="sql"
              theme={`${theme === "dark" ? "vs-dark" : 'vs-light'}`}
              onMount={onMount}
              options={{
                minimap: {enabled: false},
                overviewRulerLanes: 0,
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto',
                  verticalScrollbarSize: 0,
                },
                lineNumbers: 'off',
                glyphMargin: false,
                folding: false,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 0,
                autoIndent: 'full',
                renderLineHighlight: 'none',
                fontSize: 16,
              }}
              value={editorText}
              onChange={editorOnChange}
            />
          </div>
        <ControlBox editorText={editorText ? editorText : ''} onResult={setSQLResults} />
        </div>
          <div className="sql_result_container">
            <ResultsTable table={sqlResults ? sqlResults[0] : undefined} />  
          </div>
      </div>
    </div>
  );
};

export default SQLEditor;