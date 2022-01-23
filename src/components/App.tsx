import { useContext, useEffect, useReducer, useState } from 'react';
import { AppContext } from '../contexts/AppContext';

function App() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div className="App">
      <h1>Theme is {state.theme}</h1>
      <button
        onClick={() => {
          dispatch({ type: 'switch_theme', theme: 'dark' });
        }}
        type="button"
      >
        Switch to dark theme
      </button>
    </div>
  );
}

export default App;
