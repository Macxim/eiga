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
    fetch(`${PATH_BASE}${PATH_MOVIE}/${MOVIE_ID}?api_key=${API_KEY}&append_to_response=videos`)
    .then(response => response.json())
    .then(movie => (
      this.setState({ movie })
    ));
  }

  render () {

    const { movie } = this.state;

    console.log(movie);
    const movieBackdropStyles = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1000${movie.backdrop_path})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    };

    return (
      <div className="Movie-wrapper">
        <div className="movie-backdrop" style={movieBackdropStyles}></div>
        <div className="movie-content">
          <img className="movie-poster" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt=""/>
          <div className="movie-data">
            <h1 className="movie-title">{movie.title}</h1>
            <h4 className="movie-overview-title">Overview</h4>
            <p className="movie-overview">{movie.overview}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
