import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import '@styles/MobileNavigation/index.scss';
import { MutableRefObject, useContext, useRef } from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import SearchBox from '@components/Workspace/SearchBox';
import { AppContext } from '@contexts/AppContext';

const MobileNavigationComponent = () => {
  const {state: {isMobileSearchOpen}, dispatch} = useContext(AppContext);
  const sheetRef = useRef() as MutableRefObject<BottomSheetRef>;
  
  const searchClick = () => {
    dispatch({type: 'update_mobile_search_state', mobileSearchOpen: true});
  };

  const onSearchClose = () => {
    dispatch({type: 'update_mobile_search_state', mobileSearchOpen: false});
  }


  return (
    <>
      <div className='mobile_nav'>
        <h3 className="sql-play-title">SQLPlay</h3>
        <button className='search-btn-mobile' onClick={searchClick}>
          <AiOutlineSearch />
        </button>
      </div>
      <BottomSheet open={isMobileSearchOpen} ref={sheetRef} className="bottom-sheet-container">
        <div className='close-box'>
          <button className='close-btn' onClick={onSearchClose}>
            <AiOutlineClose />
          </button>
        </div>
        <SearchBox />
      </BottomSheet>
    </>
  )
}

export default MobileNavigationComponent