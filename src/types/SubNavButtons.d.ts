import { IconType } from 'react-icons';
import { IGlobalState } from './global';

interface SubNavButton {
  title: IGlobalState['activeSidebarTab'],
  icon: IconType
}
export default SubNavButton;
