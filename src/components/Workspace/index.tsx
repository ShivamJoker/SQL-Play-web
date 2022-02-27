import { AppContext } from '@contexts/AppContext';
import '@styles/Workspace/index.scss';
import { MutableRefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Premium from './Premium';
import SearchBox from './SearchBox';
import Settings from './Settings';
import 'react-spring-bottom-sheet/dist/style.css';
import { IoCloseOutline } from 'react-icons/io5';
import { BottomSheetRef, BottomSheet } from 'react-spring-bottom-sheet';
const sizeQuery = window.matchMedia('(max-width: 512px)');

function Workspace() {
  const { state: { activeSidebarTab }, dispatch } = useContext(AppContext);
  const sheetRef = useRef<BottomSheetRef>() as MutableRefObject<BottomSheetRef>;
  const [isMobile, setIsMobile] = useState<boolean>(sizeQuery.matches);

  useEffect(() => {
    sizeQuery.addEventListener('change', ({matches}) => {
      if(matches){
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, [])

  useEffect(() => {
    if(!isMobile){
      dispatch({type: 'switch_sidebar_tab', tab: 'search'})
    } else {
      dispatch({type: 'switch_sidebar_tab', tab: null})
    }
  }, [isMobile]);

  const renderContent = useCallback(() => {
    switch(activeSidebarTab) {
      case 'search': 
        return <SearchBox />;
      
      case 'settings': 
        return <Settings />

      case 'premium': 
        return <Premium />

      default: 
        return null;
      
    }
  }, [activeSidebarTab]);


  return (
    <>
      {!isMobile ? <div className="workspace_container">
        <div className="wrapper">
          {renderContent()}
        </div>
      </div> : <>
      
      <BottomSheet expandOnContentDrag open={Boolean(activeSidebarTab)} ref={sheetRef} className="bottom-sheet-container">
        <div className='close-box'>
          <button className='close-btn' onClick={() => dispatch({type: 'switch_sidebar_tab', tab: null})}>
            <IoCloseOutline />
          </button>
        </div>
        {renderContent()}
      </BottomSheet>

      </>}
    </>
  );
}

export default Workspace;
