import { AppContext } from '@contexts/AppContext';
import randomString from '@utils/randomString';
import { useContext } from 'react';
import ReactAccordion from 'react-fast-accordion';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { IGlobalState } from '~types/global';
import sqlSyntaxes from '~types/sqlSyntaxes';
import CodeHighlighter from './CodeHighlighter';

interface AccordionProps {
  items: sqlSyntaxes[],
  changeText: (text: string) => void;
  theme: IGlobalState['theme']
}

interface SubComponentProps extends sqlSyntaxes {
  isOpen: boolean,
  changeText: AccordionProps['changeText'];
  theme: IGlobalState['theme']
}

function SummaryComponent({ label, description, isOpen }: SubComponentProps) {
  return (
    <div className="title_and_description" key={`div-${randomString()}`}>
      <h4 className="list_heading">{label}</h4>
      <p className="list_description">{description}</p>
      <div className="arrow-up-down-box">
        {!isOpen ? <IoChevronDownOutline /> : <IoChevronUpOutline />}
      </div>
    </div>
  );
}

function DetailComponent({
  syntax, id, example, changeText, theme,
}: SubComponentProps) {
  return (
    <section
      key={`section-${randomString()}`}
      className="hidden_section"
    >
      {syntax ? (
        <div className="syntax-box" key={id}>
          <p className='syntax-text'>Syntax:</p>
          {
            typeof syntax === 'string' ? <CodeHighlighter changeText={changeText} text={syntax} theme={theme} /> : syntax.map((syntax) => <CodeHighlighter key={randomString()} changeText={changeText} text={syntax} theme={theme} />)
          }
        </div>
      ) : null}
      {example ? (
        <div key={`div-${randomString()}`}>
          <p className='example-text'>
            Example :
          </p>
          <CodeHighlighter changeText={changeText} text={example[0]} theme={theme} />
        </div>
      ) : null}
    </section>
  );
}
function Accordion({ items, changeText, theme }: AccordionProps) {
  items = items.map((item) => ({ ...item, changeText, theme }));
  return (
    <ReactAccordion items={items} SummaryComponent={SummaryComponent} DetailComponent={DetailComponent} />
  );
}

export default Accordion;
