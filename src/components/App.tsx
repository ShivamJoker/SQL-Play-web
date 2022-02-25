import SideNav from './SideNav';
import Workspace from './Workspace';
import '@styles/app.scss';
import Split from 'react-split';
import SQLEditor from './Editor';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '@contexts/AppContext';
import { IGlobalState } from '~types/global';

const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

function App() {
  const { state, dispatch } = useContext(AppContext);
  const hasListener = useRef(false);
  const [theme, setTheme] = useState<IGlobalState['theme']>();
  const setSystemTheme = (isDark: boolean) => {
    if (isDark) {
      return setTheme('dark');
    }
    setTheme('light');
  };

  // listen to the theme state
  useEffect(() => {
    if (state.theme !== 'system') {
      return;
    }

    setSystemTheme(matchMedia.matches);

    // only add listener if it doesn't exist
    if (hasListener.current) return;
    // listen for theme changes
    matchMedia.addEventListener('change', ({ matches }) => setSystemTheme(matches));

    hasListener.current = true;
  }, [state.theme]);

  useEffect(() => {
    if(state.theme === "system") {
      return;
    }
    localStorage.setItem('theme', state.theme);
    setSystemTheme(state.theme === "dark")
    dispatch({type: 'switch_theme', theme: state.theme});

  }, [state.theme]);


  useEffect(() => {

    const savedTheme = localStorage.getItem('theme') as IGlobalState['theme'] | null;

    if(savedTheme) {
      dispatch({type: 'switch_theme', theme: savedTheme})
    } else {
      setSystemTheme(matchMedia.matches);
    }

  }, []);

    useEffect(() => {
      console.log('theme', theme);
    }, [theme])

  return (
    <div className={`app ${theme}`}>
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
