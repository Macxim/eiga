import React from 'react';
import logo from '../../_img/eiga.svg';
import logoKanji from '../../_img/eiga_kanji.svg';

import './index.css';

const Header = () => {
  return (
    <div className="App-header">
      <div className="App-logo">
        <a className="App-header-title" href="/"><img src={logo} alt="Eiga"/></a>
        <a className="App-header-title-kanji" href="/"><img src={logoKanji} alt="Eiga in Kanji"/></a>
      </div>
    </div>
  );
}

export default Header;
