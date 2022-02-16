import { AppContext } from '@contexts/AppContext';
import randomString from '@utils/randomString';
import { useContext } from 'react';
import ReactAccordion from 'react-fast-accordion';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import sqlSyntaxes from '~types/sqlSyntaxes';
import CodeHighlighter from './CodeHighlighter';

interface AccordionProps {
  items: sqlSyntaxes[],
};

interface SubComponentProps extends sqlSyntaxes {
  isOpen: boolean
};

const HeaderComponent: React.FC<SubComponentProps> = ({ label, description, isOpen}) => {
  return <div className="title_and_description" key={`div-${randomString()}`}>
      <h4 className="list_heading">{label}</h4>
      <p className="list_description">{description}</p>
      <div className="arrow-up-down-box">
        {!isOpen ? <IoChevronDownOutline /> : <IoChevronUpOutline />}
      </div>
    </div>
}

const ContentComponent: React.FC<SubComponentProps> = ({syntax, id, example }) => {
  const {state, dispatch} = useContext(AppContext);
  const changeText = (text: string) => {
    dispatch({type: 'update_editor_text', text })
  }
  return (
    <section
      key={`section-${randomString()}`}
      className='hidden_section'
    >
      {syntax ? (
        <div className="syntax-box" key={id}>
          <p>Syntax:</p>
          {
            typeof syntax === "string" ? <CodeHighlighter changeText={changeText} text={syntax} theme={state.theme} /> : syntax.map((syntax) => <CodeHighlighter key={randomString()} changeText={changeText} text={syntax} theme={state.theme} />)
          }
        </div>
      ) : null}
      {example ? (
        <div key={`div-${randomString()}`}>
          <p>
            Example :
          </p>
          <CodeHighlighter changeText={changeText} text={example[0]} theme={state.theme} />
        </div>
      ) : null}
    </section>
)}
const Accordion: React.FC<AccordionProps> = ({items}) => {
  return (
    <ReactAccordion items={items as any[]} HeaderComponent={HeaderComponent} ContentComponent={ContentComponent} />
  )
}

export default Accordion