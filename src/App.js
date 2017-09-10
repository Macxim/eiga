import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { app } from './firebase';
import { PATH_POPULAR, PATH_TOP_RATED, PATH_UPCOMING } from './api';

import Loading from './components/Loading';
import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Discover from './components/Discover';
import SearchResults from './components/SearchResults';
import Movie from './components/Movie';
import NotificationSystem from 'react-notification-system';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      user: null,
      loading: true,
      favoriteMovies: {},
      ...this.defaulFilterstState
    };
  }

  defaulFilterstState = {
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
        value: 'desc',
        label: 'Descending'
      },
      year: new Date().getFullYear()
    }
  }

  updateStateWithFilters = (filters) => this.setState({ filters })

  resetFilters = () => this.setState(this.defaultState)

  addFavoriteMovie = (selectedMovie) => {
    const userUid = app.auth().currentUser.uid;

    const onComplete = (error) => {
      if (error) {
        this._notificationSystem.addNotification({
          message: 'An error ocurred.',
          level: 'error'
        });
      } else {
        this._notificationSystem.addNotification({
          message: 'Movie added to favorites.',
          level: 'success'
        });
      }
    };

    app.database().ref(userUid).child('favorites').update({
      [selectedMovie]: selectedMovie
    }, onComplete);
  }

  removeFavoriteMovie = (selectedMovie) => {
    const userUid = app.auth().currentUser.uid;

    const onComplete = (error) => {
      if (error) {
        this._notificationSystem.addNotification({
          message: 'An error ocurred.',
          level: 'error'
        });
      } else {
        this._notificationSystem.addNotification({
          message: 'Movie removed from favorites.',
          level: 'success'
        });
      }
    };

    app.database().ref(userUid).child('favorites').child(selectedMovie).remove(onComplete);
  }

  componentWillMount = () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          user,
          loading: false
        })

        const userUid = app.auth().currentUser.uid;
        app.database().ref(userUid).child('favorites').once('value').then((snapshot) => {
          const favoritesObj = snapshot.val();
          this.setState({ favoriteMovies: favoritesObj });
        })

      } else {
        this.setState({
          authenticated: false,
          user: null,
          loading: false
        })
      }
    })
  }

  componentDidMount = () => {
    this._notificationSystem = this.refs.notificationSystem;
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NotificationSystem ref="notificationSystem" />
          {this.state.loading &&
          <Loading />
          }
          <Header
            authenticated={this.state.authenticated}
            user={this.state.user}
          />
          <div className="App-main">
            <div className="App-sidebar-wrapper">
              <Sidebar
                filters={this.state.filters}
                updateFilters={this.updateStateWithFilters}
                resetFilters={this.resetFilters}
              />
              <Footer />
            </div>
              <div className="App-content-wrapper">
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/"
                  render={()=><Discover
                    title="Discover"
                    updateFilters={this.updateStateWithFilters}
                    filters={this.state.filters}
                    authenticated={this.state.authenticated}
                    addFavMovie={this.addFavoriteMovie}
                    removeFavMovie={this.removeFavoriteMovie}
                    favorites={this.state.favoriteMovies}
                    />}
                 />
                <Route exact path="/popular"
                  render={()=><Main
                    title="Popular"
                    section={PATH_POPULAR}
                    authenticated={this.state.authenticated}
                    addFavMovie={this.addFavoriteMovie}
                    removeFavMovie={this.removeFavoriteMovie}
                    favorites={this.state.favoriteMovies}
                    />}
                />
                <Route exact path="/top-rated"
                  render={()=><Main
                    title="Top Rated"
                    section={PATH_TOP_RATED}
                    authenticated={this.state.authenticated}
                    addFavMovie={this.addFavoriteMovie}
                    removeFavMovie={this.removeFavoriteMovie}
                    favorites={this.state.favoriteMovies}
                  />}
                />
                <Route exact path="/coming-soon"
                  render={()=><Main
                    title="Coming Soon"
                    section={PATH_UPCOMING}
                    authenticated={this.state.authenticated}
                    addFavMovie={this.addFavoriteMovie}
                    removeFavMovie={this.removeFavoriteMovie}
                    favorites={this.state.favoriteMovies}
                  />}
                />
                <Route path="/search" component={SearchResults}/>
                <Route path="/movie/:id-:title"
                  render={props => (
                    <Movie {...props}
                      id={props.match.params.id}
                      authenticated={this.state.authenticated}
                      onFavoriteSelect={selectedMovie => this.addFavoriteMovie(selectedMovie)}
                      onFavoriteDeselect={selectedMovie => this.removeFavoriteMovie(selectedMovie)}
                      favorites={this.state.favoriteMovies}
                    />
                  )}/>
              </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
