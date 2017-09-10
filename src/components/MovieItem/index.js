import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

class MovieItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      favorited: false
    };

  }

  checkIfIsFavorite = (id) => {
    if (this.props.favorites.indexOf(id) > -1) {
      this.setState({ favorited: true });
    }
  }

  favoriteMovie = () => {
    this.setState({ favorited: true });
    this.props.onFavoriteSelect(this.props.id);
  }

  unfavoriteMovie = () => {
    this.setState({ favorited: false });
    this.props.onFavoriteDeselect(this.props.id);
  }

  titleURL = (title) => title.replace(/\W+/g, '-').toLowerCase()

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props){
      if (this.props.authenticated){
        Object.keys(this.props.favorites).forEach((key) => {
          if (this.props.favorites[key] === this.props.id) {
            this.setState({ favorited: true });
          }
        });
      }
    }
  }

  renderFavHeart = () => {
    if (this.props.authenticated){
      if (this.state.favorited) {
        return (
          <svg onClick={() => this.unfavoriteMovie()} className="list__movie-action action__favorite is-true" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
        )
      }
      return (
        <svg onClick={() => this.favoriteMovie()} className="list__movie-action action__favorite" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
      )
    }
    return (
      <Link to="/login">
        <svg className="list__movie-action action__favorite" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
      </Link>
    )
  }

  renderWatchLaterClock = () => {
    if (this.props.authenticated){
      if (this.state.watchLater) {
        return (
        <svg className="list__movie-action action__watchlater" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"/></svg>
        )
      }
      return (
        <svg className="list__movie-action action__watchlater" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"/></svg>
      )
    }
    return (
      <Link to="/login">
        <svg className="list__movie-action action__watchlater" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"/></svg>
      </Link>
    )
  }

  render () {

    return (
      <div key={this.props.id} className="list-container__movie-item">
        <span className="list__movie-vote-average">{this.props.voteAverage}</span>

        <div className="list__movie-image">
          {this.props.posterPath ? (
            <div>
              <div className="list__movie-actions">
                {this.renderFavHeart()}
                {this.renderWatchLaterClock()}
                <svg width="10" height="15" className="list__movie-action action__playtrailer" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg"><path d="M.013.135L9.7 7.5.012 14.865" /></svg>
              </div>

              <Link className="list__movie-image-link" to={`/movie/${this.props.id}-${this.titleURL(this.props.title)}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${this.props.posterPath}`} alt={this.props.title}/></Link>
            </div>

          )
          : (
            <div>
              <div className="list__movie-actions">
                {this.renderFavButton (this.props.id)}
                <svg width="10" height="15" className="list__movie-action action__playtrailer" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg"><path d="M.013.135L9.7 7.5.012 14.865" /></svg>
              </div>
              <Link to={`/movie/${this.props.id}`}><div className="list__movie-no_image_holder"></div></Link>
            </div>
            )
          }
        </div>

        <div className="list__movie-title">
          {this.props.title}
        </div>
      </div>
    );
  }
}

export default MovieItem;