import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { PATH_POPULAR, PATH_TOP_RATED, PATH_UPCOMING } from './api';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import SearchResults from './components/SearchResults';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="App-main">
            <div className="App-sidebar-wrapper">
              <Sidebar />
            </div>
              <div className="App-content-wrapper">
                <Route exact path="/" render={()=><Main title="Popular" section={PATH_POPULAR} />}/>
                <Route exact path="/top-rated" render={()=><Main title="Top Rated" section={PATH_TOP_RATED} />}/>
                <Route exact path="/coming-soon" render={()=><Main title="Coming Soon" section={PATH_UPCOMING} />}/>
                <Route path="/search?query=:searchTerm" component={SearchResults}/>
              </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
