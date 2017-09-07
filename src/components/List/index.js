import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const List = ({ list, addFavMovie, removeFavMovie }) => {

  this.titleURL = (title) => title.replace(/\W+/g, '-').toLowerCase()

  return (
    <div className="list-container">
      {list.map(item =>
        <div key={item.id} className="list-container__item">
          <span className="list__movie-vote-average">{item.vote_average}</span>

          <div className="list__movie-image">
            {item.poster_path ? (

              <div>
                <div className="list__movie-actions">
                  <svg onClick={() => addFavMovie(item.id)} width="13" height="12" className="list__movie-action action__favorite" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"/></svg>
                  <svg width="10" height="15" className="list__movie-action action__playtrailer" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg"><path d="M.013.135L9.7 7.5.012 14.865" /></svg>
                </div>

                <Link className="list__movie-image-link" to={`/movie/${item.id}-${this.titleURL(item.title)}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt={item.title}/></Link>
              </div>

            )
            : (<Link to={`/movie/${item.id}`}><div className="list__movie-no_image_holder"></div></Link>)
            }
          </div>

          <div className="list__movie-title">
            {item.title}
          </div>
        </div>
      )}
    </div>
  );

}

export default List;
