import { useContext } from 'react';
import { AppContext } from '@contexts/AppContext';
import SideNav from './SideNav';
import Workspace from './Workspace';
import '@styles/app.scss';
import Split from 'react-split';
import SQLEditor from './Editor';

function App() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="app">
      <SideNav />
      <Split
        sizes={[25, 75]}
        maxSize={[600, Infinity]}
        minSize={[400, 0]}
        gutterSize={10}
        gutterAlign="center"
        direction="horizontal"
        className="split-container"
      >
        <Workspace />
        <SQLEditor />
      </Split>
    </div>
  );
}

export default App;
