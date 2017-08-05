import React, { Component } from 'react';

import { PATH_POPULAR, PATH_TOP_RATED, PATH_UPCOMING } from './api';

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
            <Main title="Top Rated" section={PATH_POPULAR} />
            <Main title="Coming Soon" section={PATH_UPCOMING} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
