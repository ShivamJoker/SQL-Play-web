import { HTMLAttributes } from "react"
import { IconType } from "react-icons"
import "@styles/SideNav/index.scss";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
  Icon: IconType,
  active: boolean
}

const Button: React.FC<ButtonProps> = ({Icon, active, ...props}: ButtonProps) => {

  return (
    <button className={`side_nav__nav_btns ${active ? 'btn-active' : ''}`} {...props}>
          <Icon size={30} color='white'/>
    </button>
  )
}

export default Button