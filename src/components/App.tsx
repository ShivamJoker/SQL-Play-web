import SideNav from './SideNav';
import Workspace from './Workspace';
import '@styles/app.scss';
import Split from 'react-split';
import SQLEditor from './Editor';
import { useContext, useEffect } from 'react';
import { AppContext } from '@contexts/AppContext';
import { IGlobalState } from '~types/global';

function App() {
  const {state, dispatch} = useContext(AppContext);

  const selectColorTheme = () => {
    const isSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');

    if(isSchemeDark.matches){

      dispatch({
        type: 'switch_theme',
        theme: 'dark',
      })

    } else {

      dispatch({
        type: 'switch_theme',
        theme: 'default',
      })
    }

  }

  useEffect(() => {
    if(state.theme === "system") {
      selectColorTheme();
    }
  }, [state.theme]);

  useEffect(() => {
    const theme = localStorage.getItem('theme') as IGlobalState['theme'] | null;
    if(theme && state.theme !== "system") {
      dispatch({
        type: 'switch_theme',
        theme
      })
    }else {
      selectColorTheme();
    }
  }, []);

  return (
    <div className={`app ${state.theme}`}>
      <SideNav />
      <Split
        sizes={[20, 80]}
        maxSize={[600, Infinity]}
        minSize={[400, 0]}
        gutterSize={10}
        gutterAlign="center"
        direction="horizontal"
        className="split-container"
      >
        <Workspace />
        <SQLEditor />
      </Split>
    </div>
  );
}

export default App;
