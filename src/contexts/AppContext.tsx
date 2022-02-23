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
    case 'update_editor_text': {
      return { ...state, editorText: action.text };
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
