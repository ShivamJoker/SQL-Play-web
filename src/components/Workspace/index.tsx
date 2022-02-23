import { AppContext } from '@contexts/AppContext';
import '@styles/Workspace/index.scss';
import { useContext } from 'react';
import Premium from './Premium';
import SearchBox from './SearchBox';
import Settings from './Settings';

function Workspace() {
  const { state: { activeSidebarTab } } = useContext(AppContext);
  return (
    <div className="workspace_container">
      <div className="wrapper">
        {activeSidebarTab === 'search' ? <SearchBox /> : null}
        {activeSidebarTab === 'settings' ? <Settings /> : null}
        {activeSidebarTab === 'premium' ? <Premium /> : null}
      </div>
    </div>
  );
}

export default Workspace;
