import React, { Component } from 'react';
import InputRange from 'react-input-range';
import Dropdown from 'react-dropdown';

import './index.css';
import './filterRange.css';
import './filterDropdown.css';

class Filters extends Component {

  render () {

    const appFiltersClasses = `App-filters ${this.props.filtersOpen ?  'is-open' : '' }`;
    const rangeDate = (start, end) => Array.from({length: (end - start)}, (value, key) => key + start+1).reverse();

    return (
      <div className={appFiltersClasses}>
        <ul className="filters-list">

          <li className="filters-list__item">
            <span className="filter-label">
              Released in {this.props.filters.year}
            </span>
            <Dropdown
              options={rangeDate(1900, new Date().getFullYear())}
              value={`${this.props.filters.year}`}
              onChange={year => this.props.updateFilters({ ...this.props.filters, year: year.value })} />
          </li>

          <li className="filters-list__item">
            <span className="filter-label">
              Rating from {this.props.filters.rating.min} to {this.props.filters.rating.max}
            </span>
            <InputRange
              minValue={0}
              maxValue={10}
              value={this.props.filters.rating}
              onChange={rating => this.props.updateFilters({ ...this.props.filters, rating: rating })} />
          </li>

          <li className="filters-list__item">
            <span className="filter-label">
              Duration from {this.props.filters.runtime.min} to {this.props.filters.runtime.max} (minutes)
            </span>
            <InputRange
              minValue={0}
              maxValue={500}
              value={this.props.filters.runtime}
              onChange={runtime => this.props.updateFilters({ ...this.props.filters, runtime: runtime })} />
          </li>

        </ul>
      </div>
    );

  }
}

export default Filters;
