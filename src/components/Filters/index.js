import React, { Component } from 'react';
import InputRange from 'react-input-range';

import './index.css';

class Filters extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filters: {
        rating: {
          min: 0,
          max: 10
        }
      }
    };

  }

  render () {

    const appFiltersClasses = `App-filters ${this.props.filtersOpen ?  'is-open' : '' }`;

    return (
      <div className={appFiltersClasses}>
        <ul className="filters-list">
          <li className="filters-list__item">
            <span className="filter-label">
              Rating from {this.state.filters.rating.min} to {this.state.filters.rating.max}
            </span>
            <InputRange
              maxValue={10}
              minValue={0}
              value={this.state.filters.rating}
              onChange={value => this.setState({ filters: { rating: value } })}
              onChangeComplete={value => console.log(value)} />
          </li>
        </ul>
      </div>
    );

  }
}

export default Filters;
