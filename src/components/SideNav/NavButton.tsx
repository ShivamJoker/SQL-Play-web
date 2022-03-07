import { HTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import '@styles/SideNav/index.scss';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
  active: boolean;
}

function Button({
  Icon,
  active,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      role={"button"}
      tabIndex={0}
      className={`side_nav__nav_btns ${active ? 'btn-active' : ''} ${className ? className : ''}`}
      {...props}
    >
      <Icon size={30} color="#212121" />
    </button>
  );
}

export default Button;
