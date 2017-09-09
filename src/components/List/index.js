import React from 'react';
import MovieItem from '../../components/MovieItem';

import './index.css';

const List = (props) => {

  const movieItems = props.list.map(movie => {
    return <MovieItem
              key={movie.id}
              id={movie.id}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
              title={movie.title}
              isUserAuthenticated={props.isUserAuthenticated}
              onFavoriteSelect={selectedMovie => props.addFavMovie(selectedMovie)}
              onFavoriteDeselect={selectedMovie => props.removeFavMovie(selectedMovie)}
              favorites={props.favorites} />
  });

  return (
    <div className="list-container">{movieItems}</div>
  );

}

export default List;
