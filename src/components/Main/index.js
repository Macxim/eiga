import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_MOVIE, DEFAULT_PAGE, PATH_PAGE } from '../../api';
import List from '../../components/List';
import Button from '../../components/Button';

import './index.css';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: {},
      loading: true
    };

  }

  componentDidMount = () => {
    this.getMovies(this.props.section, DEFAULT_PAGE)
  }

  getMovies = (section, page) => {
    fetch(`${PATH_BASE}${PATH_MOVIE}${section}?language=en-US&api_key=${API_KEY}&${PATH_PAGE}${page}`)
    .then(response => response.json())
    .then(movies => this.setMovies(movies));
  }

  setMovies = (movies) => {
    const { results, page } = movies;

    const oldResults = page !== 1
      ? this.state.movies.results
      : []

    const updatedResults = [
      ...oldResults,
      ...results
    ]

    this.setState({
      movies: { results: updatedResults, page },
      loading: false
    })
  }

  render () {

    const { movies } = this.state;
    const { results, page } = movies;

    return (
      <div className="Main-wrapper">
        <h1 className="App-main-title">{this.props.title}</h1>

        { results &&
          <List
            list={results}
            addToList={(selectedMovie, userList) => this.props.addToList(selectedMovie, userList)}
            removeFromList={(selectedMovie, userList) => this.props.removeFromList(selectedMovie, userList)}
            authenticated={this.props.authenticated}
            favorites={this.props.favorites}
            watchLater={this.props.watchLater}
         />
        }

        <Button
          className="button"
          onClick={() => this.getMovies(this.props.section, page + 1)}
          text="Load more"
         />
      </div>
    );

  }
}

export default Main;
