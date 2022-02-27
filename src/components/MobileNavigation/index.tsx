import { AiOutlineSearch } from 'react-icons/ai'
import '@styles/MobileNavigation/index.scss';
import { useContext } from 'react';
import { AppContext } from '@contexts/AppContext';

const MobileNavigation = () => {
  const {dispatch} = useContext(AppContext);

  const searchClick = () => {
    dispatch({type: 'switch_sidebar_tab', tab: 'search'});
  }
  return (
    <div className='mobile_nav'>
      <h3 className="sql-play-title">SQLPlay</h3>
      <button className='search-btn-mobile' onClick={searchClick}>
        <AiOutlineSearch />
      </button>
    </div>
  )
}

export default MobileNavigation