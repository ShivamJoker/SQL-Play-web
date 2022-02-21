import { HTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import '@styles/SideNav/index.scss';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
  active: boolean;
}

const Button = ({
  Icon,
  active,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`side_nav__nav_btns ${active ? 'btn-active' : ''}`}
      {...props}
    >
      <Icon size={30} color="#212121" />
    </button>
  );
};

export default Button;
