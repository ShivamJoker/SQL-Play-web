import { AppContext } from "@contexts/AppContext";
import { useCallback, useContext } from "react";
import { postEvent } from "./analytics";

const useToggler = () => {
  const { dispatch } = useContext(AppContext);

  // onThemeChange function.
  const onThemeChange = useCallback(({ matches }: { matches: boolean }) => {
    toggleDarkTheme(matches);
  }, []);

  // toggleDarkTheme function.
  const toggleDarkTheme = (isDark: boolean) => {
    if (isDark) {
      dispatch({ type: "switch_app_theme", appTheme: "dark" });
      postEvent("Theme event dark");
      return;
    }
    dispatch({ type: "switch_app_theme", appTheme: "light" });
    postEvent("Theme event light");
  };

  // useEffect callback when app's theme state updates.

  const themeStateUpdate = () => {
    if (document.body.classList.contains("light")) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };

  return { toggleDarkTheme, onThemeChange, themeStateUpdate };
};

export default useToggler;
