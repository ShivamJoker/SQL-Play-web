import { execCmd, saveDBState } from '@utils/db';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineArrowRight} from 'react-icons/ai';
import { QueryExecResult } from 'sql.js';
import {toast} from 'react-toastify';
import { AppContext } from '@contexts/AppContext';

interface Props {
  editorText: string;
  onResult: (results: QueryExecResult[] | undefined) => void;
}

const ControlBox: React.FC<Props> = ({editorText, onResult}) => {
  // hooks
  const [commandsHistory, updateCommandsHistory] = useState<string[]>([]);
  const [commandHistoryIndex, updateCommandHistoryIndex] = useState<number>(0);
  const {state} = useContext(AppContext);

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
    try {
      const results = execCmd(editorText);
      if(results && results.length){
        onResult(results);
      } else {
        onResult(undefined);
      }
      saveDBState()
    } catch (error: any) {

      const message = error.message.charAt(0).toUpperCase() + error.message.slice(1);

      toast(message, {
        type: 'error',
        theme: 'colored',
        hideProgressBar: true,
        position: 'bottom-left',
        pauseOnFocusLoss: false,
        autoClose: 5000,
      });
      onResult(undefined)
    }
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
