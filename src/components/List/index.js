import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const List = ({ list }) => {

  this.titleURL = (title) => title.replace(/\W+/g, '-').toLowerCase()

  return (
    <div className="list-container">
      {list.map(item =>
        <div key={item.id} className="list-container__item">
          <div className="list__movie-image">
            <span className="list__movie-vote-average">{item.vote_average}</span>
            {item.poster_path ? (
              <Link to={`/movie/${item.id}-${this.titleURL(item.title)}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt={item.title}/></Link>
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
