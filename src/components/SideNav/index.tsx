import {AiFillCrown, AiOutlineSearch, AiOutlineSetting} from 'react-icons/ai';
import "@styles/SideNav/index.scss";

function SideNav() {
  return (
    <>
      <div className="side_nav">
        <button className='side_nav__nav_btns'>
          <AiOutlineSearch size={30} color='white'/>
        </button>
        <button className='side_nav__nav_btns'>
          <AiOutlineSetting size={30} color='white'/>
        </button>
        <button className='side_nav__nav_btns'>
          <AiFillCrown size={30} color='white'/>
        </button>
      </div>
    </>
  );
}

export default SideNav;
