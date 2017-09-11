import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_MOVIE } from '../../api';
import { Link } from 'react-router-dom';

import './index.css';

class Movie extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      favorited: false
    };

  }

  favoriteMovie = () => {
    this.setState({ favorited: true });
    this.props.onFavoriteSelect(this.state.movie.id);
  }

  unfavoriteMovie = () => {
    this.setState({ favorited: false });
    this.props.onFavoriteDeselect(this.state.movie.id);
  }

  componentWillMount = () => {
    const MOVIE_ID = this.props.match.params.id;

    fetch(`${PATH_BASE}${PATH_MOVIE}/${MOVIE_ID}?api_key=${API_KEY}&append_to_response=videos`)
    .then(response => response.json())
    .then(movie => (
      this.setState({ movie })
    ));
  }

  componentDidMount = () => {
    if (this.props.authenticated){
      Object.keys(this.props.favorites).forEach((key) => {
        if (this.props.favorites[key] === Number(this.props.id)) {
          this.setState({ favorited: true });
        }
      });
    }
  }

  renderFavHeart = () => {
    if (this.props.authenticated){
      return (
        this.state.favorited ?
          <svg onClick={() => this.unfavoriteMovie()} className="movie__action action__favorite is-true" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
        :
          <svg onClick={() => this.favoriteMovie()} className="movie__action action__favorite" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
      )
    }
    return (
      <Link to="/login">
        <svg className="movie__action action__favorite" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
      </Link>
    )
  }

  render () {

    const { movie } = this.state;

    const movieBackdropStyles = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1000${movie.backdrop_path})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    };

    return (
      <div className="Movie-wrapper">
        <div className="movie-backdrop" style={movieBackdropStyles}></div>
        <div className="movie-content">
          <div>
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
          </div>
          <div className="movie-data">
            <h1 className="movie-title">{movie.title}</h1>

            <div className="movie-actions">

              <div className="movie-actions__item">
                <span className="movie-action-circle">
                  {this.renderFavHeart()}
                </span>
                <span className="movie__action-label">Favorite</span>
              </div>

              <div className="movie-actions__item">
                <span className="movie-action-circle">
                  <svg width="10" height="15" className="movie__action action__playtrailer" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg"><path d="M.013.135L9.7 7.5.012 14.865" /></svg>
                </span>
                <span className="movie__action-label">Play trailer</span>
              </div>

            </div>

            <h3 className="movie-overview-title">Overview</h3>
            <p className="movie-overview">{movie.overview}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
