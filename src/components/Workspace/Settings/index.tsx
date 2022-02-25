import { AppContext } from '@contexts/AppContext';
import { useContext, useEffect, useState } from 'react';
import type { IGlobalState } from '~types/global';
import '@styles/Workspace/Settings/index.scss';

const Settings: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="settings-container">
      <div className="theme-box">
        <p className="setting-name">Theme</p>
        <div className="theme-selector">
          <select value={state.theme} onChange={(e) => {

            const newTheme = (e.target.value as IGlobalState['theme']);
            if(newTheme === "system") {
              localStorage.removeItem('theme');
            }
            dispatch({type: 'switch_theme', theme: newTheme})
          }} id="">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
