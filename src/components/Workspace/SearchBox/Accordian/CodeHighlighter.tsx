import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";

import {
  vs2015,
  defaultStyle,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { IGlobalState } from '~types/global';

interface Props {
  text: string;
  changeText: (text: string) => void;
  theme: IGlobalState['theme'];
}
function CodeHighlighter({ text, changeText, theme }: Props) {
  return (
    <div onClick={() => changeText(text)} className="code-highlighter">
      <SyntaxHighlighter
        style={theme === "light" ? defaultStyle : vs2015}
        language="sql"
      >
        {text}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeHighlighter;
