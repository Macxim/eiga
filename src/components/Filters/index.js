import React, { Component } from 'react';
import InputRange from 'react-input-range';

import './index.css';

class Filters extends Component {

  updateFilters = (value) => {
    this.props.updateFilters(value);
  }

  render () {

    const appFiltersClasses = `App-filters ${this.props.filtersOpen ?  'is-open' : '' }`;

    return (
      <div className={appFiltersClasses}>
        <ul className="filters-list">
          <li className="filters-list__item">
            <span className="filter-label">
              Rating from {this.props.filters.rating.min} to {this.props.filters.rating.max}
            </span>
            <InputRange
              maxValue={10}
              minValue={0}
              value={this.props.filters.rating}
              onChange={value => {this.updateFilters(value)}} />
          </li>
        </ul>
      </div>
    );

  }
}

export default Filters;
