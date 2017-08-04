import React from 'react';

import './index.css';

const List = ({ list }) => {

  return (
    <div className="list-container">
      {list.map(item =>
        <div key={item.id} className="list-container__item">
          <div className="list__movie-image">
            <span className="list__movie-vote-average">{item.vote_average}</span>
            <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt={item.title}/>
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
