import { AppContext } from "@contexts/AppContext";
import randomString from "@utils/randomString";
import { useContext } from "react";
import ReactAccordion from "react-fast-accordion";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { IGlobalState } from "~types/global";
import sqlSyntaxes from "~types/sqlSyntaxes";
import CodeHighlighter from "./CodeHighlighter";

interface AccordionProps {
  items: sqlSyntaxes[];
}

interface SubComponentProps extends sqlSyntaxes {
  isOpen: boolean;
  updateEditorText: (code: string) => void;
  theme: IGlobalState["theme"];
}

const SummaryComponent: React.FC<SubComponentProps> = ({
  label,
  description,
  isOpen,
}) => {
  return (
    <div className="title_and_description" key={`div-${randomString()}`}>
      <h4 className="list_heading">{label}</h4>
      <p className="list_description">{description}</p>
      <div className="arrow-up-down-box">
        {!isOpen ? <IoChevronDownOutline /> : <IoChevronUpOutline />}
      </div>
    </div>
  );
};

const DetailComponent: React.FC<SubComponentProps> = ({
  syntax,
  id,
  example,
  updateEditorText,
  theme,
}) => {
  return (
    <section className="hidden_section">
      {syntax ? (
        <div className="syntax-box" key={id}>
          <p className="syntax-text">Syntax:</p>
          {typeof syntax === "string" ? (
            <CodeHighlighter
              changeText={updateEditorText}
              text={syntax}
              theme={theme}
            />
          ) : (
            syntax.map((syntax) => (
              <CodeHighlighter
                key={randomString()}
                changeText={updateEditorText}
                text={syntax}
                theme={theme}
              />
            ))
          )}
        </div>
      ) : null}
      {example ? (
        <div>
          <p className="example-text">Example :</p>
          {example.map((ex, idx) => (
            <CodeHighlighter
              key={idx}
              changeText={updateEditorText}
              text={ex}
              theme={theme}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};
const Accordion = ({ items }: AccordionProps) => {
  const { dispatch, state } = useContext(AppContext);

  return (
    <ReactAccordion
      items={items}
      theme={state.theme}
      updateEditorText={(text: string) =>
        dispatch({
          type: "update_editor_text",
          text: text,
        })
      }
      SummaryComponent={SummaryComponent}
      DetailComponent={DetailComponent}
    />
  );
};

export default Accordion;
