import SideNav from "./SideNav";
import Workspace from "./Workspace";
import "@styles/app.scss";
import SQLEditor from "./Editor";
import { useCallback, useContext, useEffect, useRef } from "react";
import { AppContext } from "@contexts/AppContext";
import { IGlobalState } from "~types/global";

const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

const savedTheme = localStorage.getItem("theme") as IGlobalState["theme"];

function App() {
  const { state, dispatch } = useContext(AppContext);
  const hasListener = useRef(false);

  const toggleDarkTheme = (isDark: boolean) => {
    if (isDark) {
      dispatch({ type: "switch_app_theme", appTheme: "dark" });
      return;
    }
    dispatch({ type: "switch_app_theme", appTheme: "light" });
  };

  const onThemeChange = useCallback(({ matches }: { matches: boolean }) => {
    toggleDarkTheme(matches);
  }, []);

  // listen to the theme state
  useEffect(() => {
    localStorage.setItem("theme", state.theme);
    // console.log("theme changed to " + state.theme);

    // if not system do nothing, we are all set
    if (state.theme !== "system") {
      toggleDarkTheme(state.theme === "dark");
      if (!hasListener.current) return;
      matchMedia.removeEventListener("change", onThemeChange);
      // console.log("removed theme change listener");

      hasListener.current = false;
      return;
    }

    // toggle theme to match current system theme
    toggleDarkTheme(matchMedia.matches);

    // only add listener if it doesn't exist
    if (hasListener.current) return;
    // listen for theme changes
    matchMedia.addEventListener("change", onThemeChange);
    hasListener.current = true;
    // console.log("added theme change listener");
  }, [state.theme]);

  useEffect(() => {
    if (savedTheme) {
      dispatch({ type: "switch_theme", theme: savedTheme });
      return;
    }

    toggleDarkTheme(matchMedia.matches);
  }, []);

  useEffect(() => {
    if(document.body.classList.contains('light')){
      document.body.classList.remove('light')
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark')
      document.body.classList.add('light');
    }
  }, [state.appTheme])

  return (
    <div className={`app`}>
      <SideNav />
      <div className="app-container">
        <Workspace />
        <SQLEditor />
      </div>
    </div>
  );
}
export default App;
