import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_MOVIE } from '../../api';
import List from '../../components/List';

import './index.css';

class UserList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: true
    };

  }

  getMovieObject = (movieId) => {
    return fetch(`${PATH_BASE}${PATH_MOVIE}/${movieId}?api_key=${API_KEY}&append_to_response=videos`)
    .then(response => response.json())
  }

  getMoviesIds = (obj) => {
    const vals = Object.keys(obj).map(key => obj[key]);
    return vals;
  }

  getAllMoviesFromList = (list) => {
    const moviesIdsArr = this.getMoviesIds(list);
    const promises = moviesIdsArr.map(item => this.getMovieObject(item));
    Promise.all(promises).then(userListMovies =>
      this.setState({
        movies: userListMovies,
        loading: false
      })
    )
  }

  componentWillReceiveProps = (nextProps) => {
    switch (this.props.title) {
      case 'Favorites':
        this.getAllMoviesFromList(nextProps.favorites)
        break;
      case 'Watch Later':
        this.getAllMoviesFromList(nextProps.watchLater)
        break;
      default:
    }
  }

  componentDidMount = () => {
    switch (this.props.title) {
      case 'Favorites':
        this.getAllMoviesFromList(this.props.favorites)
        break;
      case 'Watch Later':
        this.getAllMoviesFromList(this.props.watchLater)
        break;
      default:
    }
  }

  render () {

    const { movies } = this.state;

    return (
      <div className="Main-wrapper">
        <h1 className="App-main-title">{this.props.title}</h1>

        {movies &&
          <List
            list={movies}
            addToList={(selectedMovie, userList) => this.props.addToList(selectedMovie, userList)}
            removeFromList={(selectedMovie, userList) => this.props.removeFromList(selectedMovie, userList)}
            authenticated={this.props.authenticated}
            favorites={this.props.favorites}
            watchLater={this.props.watchLater}
         />
        }
      </div>
    );

  }
}

export default UserList;
