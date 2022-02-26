import Editor, { OnChange, OnMount, useMonaco } from '@monaco-editor/react';
import '@styles/Editor/index.scss';
import { useContext, useEffect, useState } from 'react';
import * as monacoModule from 'monaco-editor';
import getSQLData from '@utils/getSQLData';
import { QueryExecResult } from 'sql.js';
import { AppContext } from '@contexts/AppContext';
import sqlSyntaxes from '~types/sqlSyntaxes';
import ControlBox from './ControlBox';
import ResultsTable from './ResultsTable';
import { IGlobalState } from '~types/global';

function SQLEditor() {
  const monaco = useMonaco();
  const [sqlSyntaxes, setSQLData] = useState<sqlSyntaxes[] | undefined>();
  const [monacoEditor, setMonacoEditor] = useState<monacoModule.editor.IStandaloneCodeEditor>();
  const [sqlResults, setSQLResults] = useState<QueryExecResult[]>();
  const { state: { editorText, appTheme }, dispatch } = useContext(AppContext);

  useEffect(() => {
    getSQLData().then((data) => setSQLData(data));
  }, []);

  useEffect(() => {
    if (!monaco?.languages) return;

    const createDependencyProposals = (

      range: monacoModule.IRange,

    ): monacoModule.languages.CompletionItem[] => {
      if (sqlSyntaxes) {
        return sqlSyntaxes.map((item) => ({
          label: item.label,
          documentation: item.documentation,
          insertText: item.insertText,
          range,
          kind: monaco.languages.CompletionItemKind.Function,
          insertTextRules:
               monaco?.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        }));
      }
      return [];
    };
    if (sqlSyntaxes) {
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
    if (monaco?.languages && monacoEditor) {
      monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        const runSQLButton = document.querySelector<HTMLButtonElement>('button#run-sql-button');

        runSQLButton?.classList.add('focusing');
        runSQLButton?.click();

        setTimeout(() => runSQLButton?.classList.remove('focusing'), 50);

        monacoEditor.focus();
      });
    }
  }, [monaco, monacoEditor]);

  // functions

  const onMount: OnMount = (editor) => {
    setMonacoEditor(editor);
    dispatch({ type: 'update_editor_text', text: 'SELECT * FROM employees;' });
  };
  const editorOnChange: OnChange = (text) => {
    dispatch({ type: 'update_editor_text', text: text ? text.trim() : '' });
  };

  return (
    <div>
      {' '}
      {/* empty div for react-split.js */}
      <div className="sql_playground">
        <div className="code_container">
          <div className="code_container__textarea">
            <Editor
              height="200px"
              language="sql"
              theme={appTheme === "light" ? 'vs-default' : 'vs-dark'}
              onMount={onMount}
              options={{
                minimap: { enabled: false },
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                overviewRulerBorder: false,
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto',
                  verticalScrollbarSize: 0,
                  horizontalScrollbarSize: 4,
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
          <ControlBox editorText={editorText} onResult={setSQLResults} />
        </div>
        <div className="sql_result_container">
          <ResultsTable table={sqlResults ? sqlResults[0] : undefined} />
        </div>
      </div>
    </div>
  );
}

export default SQLEditor;
