import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import {Props} from '~types/components/SearchBox/Accordian';
import Highlight from 'react-highlight';

const Accordian : React.FC<Props> = ({i, expanded, setExpanded, item, changeText}) => {
  const isOpen = i === expanded;
  return (
    <div className="accordian_container">
      <motion.header
        initial={false}
        onClick={() => {
          setExpanded(isOpen ? false : i)
        }}
      >
        <div className="result_box">
          <div className="title_and_description">
            <h4 className="list_heading">{item.label}</h4>
            <p className="list_description">{item.description}</p>
            <div className="arrow-up-down-box">
              {!isOpen ? <AiOutlineDown /> : <AiOutlineUp />}
            </div>
          </div>
          <AnimatePresence initial={true}>
            {isOpen && (
              <motion.section
                key="content"
                className="hidden_section"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <motion.div className="syntax-box">{item.syntax}</motion.div>
                {item.example?.map((example) => (
                  <>
                  <motion.div onClick={() => changeText(example)}>
                    <Highlight className="example_highlighted">{example}</Highlight>
                  </motion.div>
                  </>
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </div>
  );
}

export default Accordian;
