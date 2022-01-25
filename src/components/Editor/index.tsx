import Editor, { OnMount, useMonaco } from '@monaco-editor/react';
import '@styles/SQLPlayground/index.scss';
import sqlData from '@data/sql.json';
import { useEffect } from 'react';
import { IRange, languages } from 'monaco-editor';

const SQLEditor = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco?.languages) return;

    const createDependencyProposals = (
      range: IRange
    ): languages.CompletionItem[] => {
      return sqlData.map((item) => {
        return {
          label: item.label,
          documentation: item.documentation,
          //should be syntax here
          insertText: item.insertText,
          range: range,
          kind: monaco.languages.CompletionItemKind.Function,
          insertTextRules:
            monaco?.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        };
      });
    };

    monaco?.languages.registerCompletionItemProvider('sql', {
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
  }, [monaco]);

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
