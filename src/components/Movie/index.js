import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_MOVIE } from '../../api';

import './index.css';

class Movie extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movie: {},
    };

  }

  componentDidMount = () => {
    const MOVIE_ID = this.props.match.params.id;
    fetch(`${PATH_BASE}${PATH_MOVIE}/${MOVIE_ID}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(movie => (
      this.setState({ movie })
    ));
  }

  render () {

    const { movie } = this.state;

    return (
      <div>
        <div className="App-content-wrapper">
          <div className="movie-wrapper">
            <img className="movie-backdrop" src={`https://image.tmdb.org/t/p/w1000${movie.backdrop_path}`} alt=""/>
            <div className="">
              <img className="movie-poster" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt=""/>
            </div>
            <div className="movie-data">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-overview">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
