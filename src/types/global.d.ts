export interface IGlobalState {
  activeSidebarTab: 'search' | 'settings' | 'premium';
  theme: 'dark' | 'light' | 'system';
  appTheme: 'dark' | 'light';
  sidebarCollapsed: boolean;
  sidebarPosition: 'left' | 'right';
  editorText: string;
  isMobileSearchOpen: boolean,
}

export type GlobalReducerActions =
  | {
      type: 'switch_theme';
      theme: IGlobalState['theme'];
    }
  | {
    type: 'switch_app_theme';
    appTheme: IGlobalState['appTheme'];
  }
  | {
      type: 'switch_sidebar_tab';
      tab: IGlobalState['activeSidebarTab'];
    }
  | {
      type: 'collapse_sidebar';
    }
  | { type: 'expand_sidebar' }
  | {
      type: 'update_editor_text';
      text: IGlobalState['editorText'];
    }
  | {
    type: 'update_mobile_search_state';
    mobileSearchOpen: IGlobalState['isMobileSearchOpen'];
  };
