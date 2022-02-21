import { motion } from "framer-motion";
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
const CodeHighlighter = ({ text, changeText, theme }: Props) => {
  return (
    <motion.div onClick={() => changeText(text)}>
      <SyntaxHighlighter
        style={theme == "light" ? defaultStyle : vs2015}
        language="sql"
      >
        {text}
      </SyntaxHighlighter>
    </motion.div>
  );
};

export default CodeHighlighter;
