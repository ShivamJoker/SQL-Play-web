import { AppContext } from "@contexts/AppContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import type { IGlobalState } from "~types/global";
import "@styles/Workspace/Settings/index.scss";

const Settings: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  // grab theme from localStorage, default to system
  const savedTheme = localStorage.getItem("theme") ?? "system";

  const themeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const themeVal = e.target.value as IGlobalState["theme"];
    dispatch({ type: "switch_theme", theme: themeVal });
  };

  return (
    <div className="settings-container">
      <div className="theme-box">
        <p className="setting-name">Theme</p>
        <div className="theme-selector">
          <select defaultValue={savedTheme} onChange={themeSelectHandler}>
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
