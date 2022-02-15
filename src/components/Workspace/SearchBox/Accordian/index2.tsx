import { AppContext } from '@contexts/AppContext';
import randomString from '@utils/randomString';
import { useContext } from 'react';
import ReactAccordion from 'react-fast-accordion';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { Props } from '~types/components/SearchBox/Accordian';
import sqlSyntaxes from '~types/sqlSyntaxes';
import CodeHighlighter from './CodeHighlighter';

interface AccordionProps {
  items: sqlSyntaxes[],
  changeText: (text: string) => void;
};

interface HeaderComponentProps extends Props {
  isOpen: boolean

};

const HeaderComponent: React.FC<HeaderComponentProps> = ({item, isOpen}) => {
  return <div className="title_and_description">
      <h4 className="list_heading">{item?.label}</h4>
      <p className="list_description">{item?.description}</p>
      <div className="arrow-up-down-box">
        {!isOpen ? <IoChevronDownOutline /> : <IoChevronUpOutline />}
      </div>
    </div>
}

const ContentComponent: React.FC<Props> = ({item, changeText}) => {
  const {state} = useContext(AppContext);
  return (
    <section
      key="content"
      className='hidden_section'
    >
      {item && item.syntax ? (
        <div className="syntax-box" key={item.id}>
          <p>Syntax:</p>
          {
            typeof item.syntax === "string" ? <CodeHighlighter changeText={changeText} text={item.syntax} theme={state.theme} /> : item.syntax.map((syntax) => <CodeHighlighter key={randomString()} changeText={changeText} text={syntax} theme={state.theme} />)
          }
        </div>
      ) : null}
      {item && item.example?.map((example) => (
        <div key={example}>
          <p>
            Example :
          </p>
          <CodeHighlighter changeText={changeText} text={example} theme={state.theme} />
        </div>
      ))}
    </section>
)}
const Accordion: React.FC<AccordionProps> = ({items}) => {
  return (
    <ReactAccordion items={items as any[]} HeaderComponent={HeaderComponent} ContentComponent={ContentComponent} />
  )
}

export default Accordion