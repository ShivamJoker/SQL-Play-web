import SideNav from "./SideNav";
import Workspace from "./Workspace";
import "@styles/app.scss";
import Split from "react-split";
import SQLEditor from "./Editor";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "@contexts/AppContext";
import { IGlobalState } from "~types/global";

const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

function App() {
  const { state, dispatch } = useContext(AppContext);
  const hasListener = useRef(false);

  const setStystemTheme = (isDark: boolean) => {
    if (isDark) {
      return dispatch({
        type: "switch_theme",
        theme: "dark",
      });
    }

    dispatch({
      type: "switch_theme",
      theme: "light",
    });
  };

  // listen to the theme state
  useEffect(() => {
    if (state.theme !== "system") {
      return;
    }

    setStystemTheme(matchMedia.matches);

    // only add listener if it doesn't exist
    if (hasListener.current) return;
    // listen for theme changes
    matchMedia.addEventListener("change", ({ matches }) =>
      setStystemTheme(matches)
    );

    hasListener.current = true;
  }, [state.theme]);

  useEffect(() => {
    // try to get theme from localStorage first
    const savedTheme = localStorage.getItem("theme") as
      | IGlobalState["theme"]
      | null;

    // if theme is not system then only change the context
    if (!savedTheme || savedTheme === "system") {
      return;
    }

    dispatch({
      type: "switch_theme",
      theme: savedTheme,
    });
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
