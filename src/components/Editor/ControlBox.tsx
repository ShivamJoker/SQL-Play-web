import { execCmd, saveDBState } from '@utils/db';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { QueryExecResult } from 'sql.js';
import { toast, ToastOptions } from 'react-toastify';
import { AppContext } from '@contexts/AppContext';
interface Props {
  editorText: string;
  onResult: (results: QueryExecResult[] | undefined) => void;
}

function ControlBox({ editorText, onResult }: Props) {
  const {state: {theme}} = useContext(AppContext);
  const [toastTheme, setToastTheme] = useState<ToastOptions['theme']>('light');

  useEffect(() => {
    if(theme === "system"){
      const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if(matchMedia.matches){
        setToastTheme('dark');
      } else {
        setToastTheme('light');
      }
    } else if(theme === "dark"){
      setToastTheme('dark')
    }
    else {
      setToastTheme('light')
    };

  }, [theme]);

  const onRun = () => {
    try {
      const results = execCmd(editorText);
      if (results && results.length) {
        onResult(results);
      } else {
        onResult(undefined);
      }
      saveDBState();
    } catch (error: any) {
      const message = error.message.charAt(0).toUpperCase() + error.message.slice(1);

      toast(message, {
        type: 'error',
        theme: toastTheme,
        hideProgressBar: false,
        position: 'bottom-right',
        pauseOnFocusLoss: false,
        autoClose: 5000,
      });
      onResult(undefined);
    }
  };

  return (
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
      <button className="code_container__control_box__button" id="run-sql-button" onClick={onRun}>
        Run
        {' '}
        <AiOutlineArrowRight size={20} color="var(--bg-reverse)" />
      </button>
    </div>
  );
}

export default ControlBox;
