import { IconType } from 'react-icons';
import { IGlobalState } from './global';

interface SubNavButton {
  title: IGlobalState['activeSidebarTab'],
  icon: IconType,
  className?: string;
}
export default SubNavButton;
