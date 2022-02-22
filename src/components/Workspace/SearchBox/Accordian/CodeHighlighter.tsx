import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";

import {
  vs2015,
  defaultStyle,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

import { IGlobalState } from "~types/global";

interface Props {
  text: string;
  changeText: (text: string) => void;
  theme: IGlobalState["theme"];
}
const CodeHighlighter: React.FC<Props> = ({ text, changeText, theme }) => {
  return (
    <div onClick={() => changeText(text)}>
      <SyntaxHighlighter
        style={theme == "light" ? defaultStyle : vs2015}
        language="sql"
      >
        {text}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeHighlighter;
