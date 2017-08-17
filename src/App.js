import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { PATH_POPULAR, PATH_TOP_RATED, PATH_UPCOMING } from './api';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Filters from './components/Filters';
import Main from './components/Main';
import Discover from './components/Discover';
import SearchResults from './components/SearchResults';
import Movie from './components/Movie';


import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filtersOpen: true,
      filters: {
        rating: {
          min: 0,
          max: 10
        },
        year: new Date().getFullYear()
      }
    };

  }

  toggleFilters = () => {
    this.setState({filtersOpen: !this.state.filtersOpen});
  }

  updateStateWithFilters = (filters) => { this.setState({ filters }) }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="App-main">
            <div className="App-sidebar-wrapper">
              <Sidebar />
              <Filters filtersOpen={this.state.filtersOpen} filters={this.state.filters} updateFilters={this.updateStateWithFilters} />
            </div>
              <div className="App-content-wrapper">
                <Route exact path="/" render={()=><Discover title="Discover" toggleFilters={this.toggleFilters} filters={this.state.filters} />}/>
                <Route exact path="/popular" render={()=><Main title="Popular" section={PATH_POPULAR} />}/>
                <Route exact path="/top-rated" render={()=><Main title="Top Rated" section={PATH_TOP_RATED} />}/>
                <Route exact path="/coming-soon" render={()=><Main title="Coming Soon" section={PATH_UPCOMING} />}/>
                <Route path="/search" component={SearchResults}/>
                <Route path="/movie/:id-:title" component={Movie}/>
              </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
