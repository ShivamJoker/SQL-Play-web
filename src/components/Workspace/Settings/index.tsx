import { AppContext } from '@contexts/AppContext';
import {useContext, useEffect, useState} from 'react';
import type {IGlobalState} from '~types/global';
import '@styles/Workspace/Settings/index.scss';
const Settings: React.FC = () => {
  const {state, dispatch} = useContext(AppContext)
  const [selectedTheme, setSelectedTheme] = useState<IGlobalState['theme']>();
  
  const onThemeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(e.target.value as IGlobalState['theme']);
  }

  useEffect(() => {
    if(selectedTheme){
      localStorage.setItem('theme', selectedTheme)
      dispatch({
        type: 'switch_theme',
        theme: selectedTheme
      })
    }
  }, [selectedTheme]);

  return (
    <>
      <div className="settings-container">
        <div className="theme-box">
          <p className="setting-name">
            Theme
          </p>
          <div className="theme-selector">
            <select value={selectedTheme} onChange={onThemeSelect} id="">
              <option value="system">System</option>
              <option value="default">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
