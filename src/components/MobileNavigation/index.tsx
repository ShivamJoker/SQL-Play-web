import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import '@styles/MobileNavigation/index.scss';
import { MutableRefObject, useRef, useState } from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import SearchBox from '@components/Workspace/SearchBox';

const MobileNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const sheetRef = useRef() as MutableRefObject<BottomSheetRef>;
  
  const searchClick = () => {
    setIsSearchOpen(true);
  };

  const onSearchClose = () => {
    setIsSearchOpen(false);
  }


  return (
    <>
      <div className='mobile_nav'>
        <h3 className="sql-play-title">SQLPlay</h3>
        <button className='search-btn-mobile' onClick={searchClick}>
          <AiOutlineSearch />
        </button>
      </div>
      <BottomSheet open={isSearchOpen} ref={sheetRef} className="bottom-sheet-container">
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

export default MobileNavigation