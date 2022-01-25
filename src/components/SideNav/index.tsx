import {
  AiFillCrown,
  AiOutlineCrown,
  AiOutlineSearch,
  AiOutlineSetting,
} from 'react-icons/ai';
import { useContext } from 'react';
import { AppContext } from '@contexts/AppContext';
import type { IGlobalState } from '~types/global';
import Button from './NavButton';
import SubNavButton from '~types/SubNavButtons';

function SideNav() {
  const {
    state: { activeSidebarTab },
    dispatch,
  } = useContext(AppContext);

  const setActiveTab = (tabName: IGlobalState['activeSidebarTab']) => {
    dispatch({ tab: tabName, type: 'switch_sidebar_tab' });
  };

  const buttons: SubNavButton[] = [
    {
      title: 'search',
      icon: AiOutlineSearch,
    },
    {
      title: 'settings',
      icon: AiOutlineSetting,
    },
    {
      title: 'premium',
      icon: AiOutlineCrown,
    },
  ];

  const buttonPress = (btnKey: IGlobalState['activeSidebarTab']) => {
    setActiveTab(btnKey);

    // code for events like changing workspace's screen will be here.
  };

  return (
    <div className="side_nav">
      {buttons.map((btn) => (
        <Button
          Icon={btn.icon}
          active={btn.title === activeSidebarTab}
          key={btn.title}
          onClick={() => buttonPress(btn.title)}
        />
      ))}
    </div>
  );
}

export default SideNav;
