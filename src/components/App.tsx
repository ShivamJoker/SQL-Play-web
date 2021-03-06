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
const sizeMedia = window.matchMedia("(max-width: 720px)");

const savedTheme = localStorage.getItem("theme") as IGlobalState["theme"];

function App() {
  const {
    state: { theme, appTheme },
    dispatch,
  } = useContext(AppContext);
  const hasListener = useRef(false);
  const { toggleDarkTheme, onThemeChange, themeStateUpdate } = useToggler();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const removeThemeListener = () => {
    themeMedia.removeEventListener("change", onThemeChange);
  };

  useEffect(() => {
    // console.log("use effect mount");
    // set default device type on initial load of page.
    setIsMobile(sizeMedia.matches);

    sizeMedia.addEventListener("change", ({ matches }) => {
      setIsMobile(matches);
    });

    if (savedTheme) {
      dispatch({ type: "switch_theme", theme: savedTheme });
      return;
    }

    toggleDarkTheme(themeMedia.matches);

    return () => {
      removeThemeListener();
    };
  }, []);

  // listen to the theme state
  useEffect(() => {
    localStorage.setItem("theme", theme);
    // console.log("theme changed to " + state.theme);

    // console.log("use effect theme change", theme);
    // if not system do nothing, we are all set
    if (theme !== "system") {
      toggleDarkTheme(theme === "dark");
      if (!hasListener.current) return;
      // console.log("removed theme change listener");
      removeThemeListener();
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
  }, [theme]);

  useEffect(() => {
    themeStateUpdate();
    // console.log("app theme", appTheme);
  }, [appTheme]);

  return (
    <div className="app">
      {!isMobile ? <SideNav /> : <MobileNavigation />}
      <div className="app-container">
        <Workspace />
        <SQLEditor />
      </div>
    </div>
  );
}
export default App;
