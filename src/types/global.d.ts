export interface IGlobalState {
  activeSidebarTab: 'search' | 'settings' | 'premium';
  theme: 'dark' | 'default' | 'system';
  sidebarCollapsed: boolean;
  sidebarPosition: 'left' | 'right';
}

export type GlobalReducerActions =
  | {
      type: 'switch_theme';
      theme: IGlobalState['theme'];
    }
  | {
      type: 'switch_sidebar_tab';
      tab: IGlobalState['activeSidebarTab'];
    }
  | {
      type: 'collapse_sidebar';
    }
  | { type: 'expand_sidebar' };
