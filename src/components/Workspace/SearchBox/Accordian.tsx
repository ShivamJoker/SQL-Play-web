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
      >
        <motion.div className="result_box">
          <motion.div className="title_and_description" onClick={() => {
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
        }}>
            <motion.h4 className="list_heading">{item.label}</motion.h4>
            <motion.p className="list_description">{item.description}</motion.p>
            <motion.div className="arrow-up-down-box">
              {!isOpen ? <IoChevronDownOutline /> : <IoChevronUpOutline />}
            </motion.div>
          </motion.div>
          <AnimatePresence initial={true}>
            {isOpen && (
              <motion.section
                key="content"
                className='hidden_section'
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.1 }}
              >
                <motion.div className="syntax-box">
                  <motion.p>Syntax:</motion.p>
                  <SyntaxHighlighter style={state.theme == "default" ? materialLight : materialDark} language="sql">
                  {item.syntax}
                  </SyntaxHighlighter>
                </motion.div>
                {item.example?.map((example) => (
                  <motion.div key={example}>
                    <motion.p>
                      Example :
                    </motion.p>
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
