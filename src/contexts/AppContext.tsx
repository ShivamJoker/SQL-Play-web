import {
  createContext, Dispatch, ReactNode, useReducer,
} from 'react';
import { GlobalReducerActions, IGlobalState } from '~types/global';

const initialState: IGlobalState = {
  activeSidebarTab: 'search',
  sidebarCollapsed: false,
  sidebarPosition: 'left',
  theme: 'system',
  editorText: '',
  appTheme: 'light',
  isMobileSearchOpen: false,
};

const reducer = (state: IGlobalState, action: GlobalReducerActions): IGlobalState => {
  // declare all the cases here

  switch (action.type) {
    case 'switch_sidebar_tab': {
      return { ...state, activeSidebarTab: action.tab };
    }
    case 'switch_theme': {
      return { ...state, theme: action.theme };
    }
    case 'switch_app_theme': {
      return { ...state, appTheme: action.appTheme };
    }
    case 'update_editor_text': {
      return { ...state, editorText: action.text };
    }
    case 'update_mobile_search_state': {
      return { ...state, isMobileSearchOpen: action.mobileSearchOpen };
    }
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: IGlobalState;
  dispatch: Dispatch<GlobalReducerActions>;
}>({ state: initialState, dispatch: () => null });

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
