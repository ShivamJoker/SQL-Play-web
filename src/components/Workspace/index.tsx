import { AppContext } from '@contexts/AppContext';
import '@styles/Workspace/index.scss';
import { useCallback, useContext } from 'react';
import Premium from './Premium';
import SearchBox from './SearchBox';
import Settings from './Settings';
import 'react-spring-bottom-sheet/dist/style.css';

function Workspace() {
  const { state: { activeSidebarTab } } = useContext(AppContext);

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
    <div className="workspace_container">
      <div className="wrapper">
        {renderContent()}
      </div>
    </div>
  );
}

export default Workspace;
