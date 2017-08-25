import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { PATH_POPULAR, PATH_TOP_RATED, PATH_UPCOMING } from './api';

import Header from './components/Header';
import Login from './components/Login';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Discover from './components/Discover';
import SearchResults from './components/SearchResults';
import Movie from './components/Movie';


import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = this.defaultState;
  }

  defaultState = {
    authenticated: false,
    filters: {
      rating: {
        min: 5,
        max: 10
      },
      runtime: {
        min: 45,
        max: 250
      },
      sort_by: {
        value: 'vote_average',
        label: 'Rating'
      },
      order: {
        value: 'asc',
        label: 'Ascending'
      },
      year: new Date().getFullYear()
    }
  }

  updateStateWithFilters = (filters) => this.setState({ filters })

  resetFilters = () => this.setState(this.defaultState)

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header
            authenticated={this.state.authenticated}
          />
          <div className="App-main">
            <div className="App-sidebar-wrapper">
              <Sidebar
                filters={this.state.filters} updateFilters={this.updateStateWithFilters}                   resetFilters={this.resetFilters} />
              <Footer />
            </div>
              <div className="App-content-wrapper">
                <Route exact path="/login" component={Login} />
                <Route exact path="/"
                  render={()=><Discover
                    title="Discover"
                    updateFilters={this.updateStateWithFilters}
                    filters={this.state.filters}
                    />}
                 />
                <Route exact path="/popular"
                  render={()=><Main
                    title="Popular"
                    section={PATH_POPULAR}
                    />}
                />
                <Route exact path="/top-rated"
                  render={()=><Main
                    title="Top Rated"
                    section={PATH_TOP_RATED}
                  />}
                />
                <Route exact path="/coming-soon"
                  render={()=><Main
                    title="Coming Soon"
                    section={PATH_UPCOMING}
                  />}
                />
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
