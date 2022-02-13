import { execCmd } from '@utils/db';
import { useEffect, useState } from 'react';
import {AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineArrowRight} from 'react-icons/ai';
import {MdClearAll} from 'react-icons/md';
import { QueryExecResult } from 'sql.js';

interface Props {
  editorText: string;
  onResult?: (results: QueryExecResult[]) => void;
}

const ControlBox: React.FC<Props> = ({editorText, onResult}) => {
  // hooks
  const [commandsHistory, updateCommandsHistory] = useState<string[]>([]);
  const [commandHistoryIndex, updateCommandHistoryIndex] = useState<number>(0);


  // effects
  useEffect(() => {
    if(commandsHistory && commandsHistory.length){
      updateCommandHistoryIndex(commandsHistory.length);
    }
  }, [commandsHistory]);


  // functions

  const addInHistory = (text: string) => {
    updateCommandsHistory(prev => {
      prev.push(text)
      return prev
    })
  }


  const onRun = () => {
    addInHistory(editorText);
    const results = execCmd(editorText);
    if(results && onResult) onResult(results);
  }


  const sqlHistory = (step: 'down' | 'up') => {
    if(step === "up"){
      const cmd = commandsHistory[commandsHistory.length - 2];
      return;
    }
  }

  return(
    <div className="code_container__control_box">
      {/* <button className="code_container__control_box__button">
        <AiOutlineArrowUp size={20} color="var(--bg-reverse)"/>
      </button>
      <button className="code_container__control_box__button">
        <AiOutlineArrowDown size={20} color="var(--bg-reverse)"/>
      </button>
      <button className="code_container__control_box__button">
        <MdClearAll size={20} color="var(--bg-reverse)"/>
      </button> */}
      <button className="code_container__control_box__button" id='run-sql-button' onClick={onRun}>
        Run <AiOutlineArrowRight size={20} color="var(--bg-reverse)"/>
      </button>
    </div>
  )
}

export default ControlBox;
