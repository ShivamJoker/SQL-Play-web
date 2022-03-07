import { AiOutlineSearch } from "react-icons/ai";
import "@styles/MobileNavigation/index.scss";
import { MutableRefObject, useContext, useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import SearchBox from "@components/Workspace/SearchBox";
import { AppContext } from "@contexts/AppContext";

const MobileNavigationComponent = () => {
  const {
    state: { isMobileSearchOpen },
    dispatch,
  } = useContext(AppContext);
  const sheetRef = useRef() as MutableRefObject<BottomSheetRef>;

  const searchClick = () => {
    dispatch({ type: "update_mobile_search_state", mobileSearchOpen: true });
  };

  const onSearchClose = () => {
    dispatch({ type: "update_mobile_search_state", mobileSearchOpen: false });
  };

  return (
    <>
      <div className="mobile_nav">
        <h3 className="sql-play-title">SQL Play</h3>
        <button className="search-btn-mobile" onClick={searchClick}>
          <AiOutlineSearch />
        </button>
      </div>
      <BottomSheet
        open={isMobileSearchOpen}
        onDismiss={onSearchClose}
        ref={sheetRef}
        className="bottom-sheet-container"
        snapPoints={({ maxHeight }) => [maxHeight * 0.8, maxHeight]}
      >
        <SearchBox />
      </BottomSheet>
    </>
  );
};

export default MobileNavigationComponent;
