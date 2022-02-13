import { motion, AnimatePresence } from "framer-motion";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import {Props} from '~types/components/SearchBox/Accordian';
import {PrismAsyncLight as SyntaxHighlighter} from 'react-syntax-highlighter';

import {materialLight, materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useContext, useState } from "react";
import { AppContext } from "@contexts/AppContext";

const Accordian : React.FC<Props> = ({i, expanded, setExpanded, item, changeText}) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const {state} = useContext(AppContext);
  return (
    <motion.div className="accordian_container">
      <motion.header
        initial={false}
        onClick={() => {
          let newList: Array<number>;
          if(isOpen){
            newList = expanded.filter(n => n !== i);
            setIsOpen(false)
          } else {
            expanded.push(i);
            setIsOpen(true)
            newList = expanded;
          }
          setExpanded(newList);
        }}
      >
        <motion.div className="result_box">
          <motion.div className="title_and_description">
            <motion.h4 className="list_heading">{item.label}</motion.h4>
            <motion.p className="list_description">{item.description}</motion.p>
            <motion.div className="arrow-up-down-box">
              {!isOpen ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
            </motion.div>
          </motion.div>
          <AnimatePresence initial={true}>
            {isOpen && (
              <motion.section
                key="content"
                className='hidden_section'
                // initial="collapsed"
                // animate="open"
                // exit="collapsed"
                // variants={{
                //   open: { opacity: 1, height: "100%" },
                //   collapsed: { opacity: 0, height: '0' }
                // }}
                // transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <motion.div className="syntax-box">
                  <motion.h4>Syntax:</motion.h4>
                  <SyntaxHighlighter style={state.theme == "default" ? materialLight : materialDark} language="sql">
                  {item.syntax}
                  </SyntaxHighlighter>
                </motion.div>
                {item.example?.map((example, index) => (
                  <motion.div key={example}>
                    <motion.h4>
                      Example
                      {item && item.example && item.example.length > 1 ? ` ${index + 1}` : ''}:
                    </motion.h4>
                    <motion.div onClick={() => changeText(example)}>
                      <SyntaxHighlighter style={state.theme == "default" ? materialLight : materialDark} language="sql">{example}</SyntaxHighlighter>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>
    </motion.div>
  );
}

export default Accordian;
