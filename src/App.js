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
import UserLists from './components/UserLists';
import NotificationSystem from 'react-notification-system';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      user: null,
      loading: true,
      favorites: {},
      watchLater: {},
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

  handleUserListsState = (userUid, list, state) => {
    app.database().ref(userUid).child(list).on('value', (snapshot) => {
      const stateObject = () => {
        const obj = {};
        obj[state] = snapshot.val();
        return obj;
      }
      this.setState(stateObject);
    })
  }

  resetFilters = () => this.setState(this.defaultState)

  addToUserList = (selectedMovie, userList) => {
    const userUid = app.auth().currentUser.uid;

    const onComplete = (error) => {
      if (error) {
        this._notificationSystem.addNotification({
          message: 'Oh no! An error ocurred. 😨',
          level: 'error'
        });
      } else {
        this._notificationSystem.addNotification({
          message: 'Movie succesfully added. 😉',
          level: 'success'
        });
      }
    };

    app.database().ref(userUid).child(userList).update({
      [selectedMovie]: selectedMovie
    }, onComplete);
    this.handleUserListsState(userUid, userList, userList);
  }

  removeFromUserList = (selectedMovie, userList) => {
    const userUid = app.auth().currentUser.uid;

    const onComplete = (error) => {
      if (error) {
        this._notificationSystem.addNotification({
          message: 'Oh no! An error ocurred. 😨',
          level: 'error'
        });
      } else {
        this._notificationSystem.addNotification({
          message: 'Movie succesfully removed. 😉',
          level: 'success'
        });
      }
    };

    app.database().ref(userUid).child(userList).child(selectedMovie).remove(onComplete);
    this.handleUserListsState(userUid, userList, userList);
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
        app.database().ref(userUid).once('value').then((snapshot) => {
          const firebaseUserLists = snapshot.val();
          if (firebaseUserLists) {
            this.setState(firebaseUserLists);
          }
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
                    addToList={this.addToUserList}
                    removeFromList={this.removeFromUserList}
                    favorites={this.state.favorites}
                    watchLater={this.state.watchLater} />}
                 />
                <Route exact path="/popular"
                  render={()=><Main
                    title="Popular"
                    section={PATH_POPULAR}
                    authenticated={this.state.authenticated}
                    addToList={this.addToUserList}
                    removeFromList={this.removeFromUserList}
                    favorites={this.state.favorites}
                    watchLater={this.state.watchLater} />}
                />
                <Route exact path="/top-rated"
                  render={()=><Main
                    title="Top Rated"
                    section={PATH_TOP_RATED}
                    authenticated={this.state.authenticated}
                    addToList={this.addToUserList}
                    removeFromList={this.removeFromUserList}
                    favorites={this.state.favorites}
                    watchLater={this.state.watchLater}  />}
                />
                <Route exact path="/coming-soon"
                  render={()=><Main
                    title="Coming Soon"
                    section={PATH_UPCOMING}
                    authenticated={this.state.authenticated}
                    addToList={this.addToUserList}
                    removeFromList={this.removeFromUserList}
                    favorites={this.state.favorites}
                    watchLater={this.state.watchLater}  />}
                />
                <Route path="/search" component={SearchResults}/>
                <Route path="/movie/:id-:title"
                  render={props => (
                    <Movie {...props}
                      id={props.match.params.id}
                      authenticated={this.state.authenticated}
                      onFavoriteSelect={selectedMovie => this.addToUserList(selectedMovie)}
                      onFavoriteDeselect={selectedMovie => this.removeFromUserList(selectedMovie)}
                      favorites={this.state.favorites}
                      watchLater={this.state.watchLater} />)}
                />
                <Route exact path="/favorites"
                  render={()=><UserLists
                    title="Favorites"
                    authenticated={this.state.authenticated}
                    addToList={this.addToUserList}
                    removeFromList={this.removeFromUserList}
                    favorites={this.state.favorites}
                    watchLater={this.state.watchLater}  />}
                />

                <Route exact path="/watch-later"
                  render={()=><UserLists
                    title="Watch Later"
                    authenticated={this.state.authenticated}
                    addToList={this.addToUserList}
                    removeFromList={this.removeFromUserList}
                    favorites={this.state.favorites}
                    watchLater={this.state.watchLater}  />}
                />
              </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
