import { useContext } from 'react';
import { AppContext } from '@contexts/AppContext';
import SideNav from './SideNav';
import Workspace from './Workspace';
import '@styles/app.scss';
import Split from 'react-split';
import SQLPlayground from './SQLPlayground';

function App() {
  
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className='app'>
      <SideNav />
      <Split
      sizes={[30, 70]}
      maxSize={[400, Infinity]}
      minSize={[200, 0]}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      direction="horizontal"
      className='split-container'>
      <Workspace />
      <SQLPlayground />
      </Split>
    </div>
  );
}

export default App;
