import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useLocalization } from './contexts/localization';
import { Languages } from './contexts/localization/languages';
import { useStyle } from './contexts/styles';
import Topbar from './components/topbar/component';

function App() {
  const { translate, state, actions } = useLocalization('languages');
  const { primaryColor, secondaryColor } = useStyle();
  const { selectedLanguage } = state;
  const { changeLanguage } = actions;

  return (
    <div className="App">
      <Topbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>
          <button onClick={() => changeLanguage(Languages.POLISH)}>Polish</button>
          <button onClick={() => changeLanguage(Languages.ENGLISH)}>English</button>
        </div>
        <p>Primary color: {primaryColor}, Secondary Color: {secondaryColor}</p>
        <p>Selected language is: {translate(selectedLanguage.name)}</p>
        <img src={selectedLanguage.flagUrl} alt={selectedLanguage.name} />
      </header>
    </div>
  );
}

export default App;
