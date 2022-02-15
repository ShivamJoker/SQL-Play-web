import { motion } from "framer-motion";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";

import {
  materialLight,
  materialDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { IGlobalState } from "~types/global";

interface Props {
  text: string;
  changeText: (text: string) => void;
  theme: IGlobalState["theme"];
}
const CodeHighlighter: React.FC<Props> = ({ text, changeText, theme }) => {
  return (
    <motion.div onClick={() => changeText(text)}>
      <SyntaxHighlighter
        style={theme == "light" ? materialLight : materialDark}
        language="sql"
      >
        {text}
      </SyntaxHighlighter>
    </motion.div>
  );
};

export default CodeHighlighter;
