import SideNav from "./SideNav";
import Workspace from "./Workspace";
import "@styles/app.scss";
import SQLEditor from "./Editor";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@contexts/AppContext";
import { IGlobalState } from "~types/global";
import useToggler from "@utils/useThemeFunctions";
import MobileNavigation from "./MobileNavigation";

const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
const sizeMedia = window.matchMedia("(max-width: 512px)");

const savedTheme = localStorage.getItem("theme") as IGlobalState["theme"];

function App() {
  const { state, dispatch } = useContext(AppContext);
  const hasListener = useRef(false);
  const [isMobile, setIsMobile] = useState<boolean>(sizeMedia.matches);
  const {toggleDarkTheme, onThemeChange, themeStateUpdate} = useToggler();

  // listen to the theme state
  useEffect(() => {
    localStorage.setItem("theme", state.theme);
    // console.log("theme changed to " + state.theme);

    // if not system do nothing, we are all set
    if (state.theme !== "system") {
      toggleDarkTheme(state.theme === "dark");
      if (!hasListener.current) return;
      themeMedia.removeEventListener("change", onThemeChange);
      // console.log("removed theme change listener");

      hasListener.current = false;
      return;
    }

    // toggle theme to match current system theme
    toggleDarkTheme(themeMedia.matches);

    // only add listener if it doesn't exist
    if (hasListener.current) return;
    // listen for theme changes
    themeMedia.addEventListener("change", onThemeChange);
    hasListener.current = true;
    // console.log("added theme change listener");
  }, [state.theme]);

  useEffect(() => {
    if (savedTheme) {
      dispatch({ type: "switch_theme", theme: savedTheme });
      return;
    }

    toggleDarkTheme(themeMedia.matches);
  }, []);

  useEffect(themeStateUpdate, [state.appTheme])


  useEffect(() => {
    sizeMedia.addEventListener('change', ({matches}) => {
      setIsMobile(matches)
    });
  }, [])

  return (
    <div className={`app`}>
      {!isMobile ? <SideNav /> : <MobileNavigation />}
      <div className="app-container">
        <Workspace />
        <SQLEditor />
      </div>
    </div>
  );
}
export default App;
