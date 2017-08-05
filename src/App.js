import React, { Component } from 'react';
import { PATH_POPULAR } from './api';


import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-main">
          <div className="App-sidebar-wrapper">
            <Sidebar />
          </div>
          <div className="App-content-wrapper">
            <Main title="Popular" section={PATH_POPULAR} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
