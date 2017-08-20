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
    const sort_by = [
      { value: 'popularity', label: 'Popularity' },
      { value: 'vote_average', label: 'Rating' },
      { value: 'original_title', label: 'Original Title' }];
    const sort_by_order = [
      { value: 'asc', label: 'Ascending' },
      { value: 'desc', label: 'Descending' }
    ];

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

          <li className="filters-list__item">
            <span className="filter-label">
              Sort by {this.props.filters.sort_by.label} - {this.props.filters.order.label}
            </span>
            <Dropdown
              options={sort_by}
              value={`${this.props.filters.sort_by.label}`}
              onChange={sort_by => this.props.updateFilters({ ...this.props.filters, sort_by: sort_by })} />
            <Dropdown
              options={sort_by_order}
              value={`${this.props.filters.order.label}`}
              onChange={order => this.props.updateFilters({ ...this.props.filters, order: order })} />
          </li>

        </ul>
      </div>
    );

  }
}

export default Filters;
