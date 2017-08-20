import React, { Component } from 'react';
import InputRange from 'react-input-range';
import Dropdown from 'react-dropdown';

import './index.css';
import './filterRange.css';
import './filterDropdown.css';

class Filters extends Component {

  toggleFilters = () => {
    this.props.toggleFilters();
  }

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

        <div className="filters-close-icon-wrap">
          <svg onClick={this.toggleFilters} className="filters-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125"><path d="M15.646 15.646c-18.974 18.974-18.974 49.734 0 68.708 18.974 18.975 49.734 18.975 68.708 0 18.975-18.975 18.975-49.734 0-68.708-18.974-18.974-49.734-18.974-68.708 0zm62.31 62.31c-15.415 15.414-40.497 15.414-55.912 0-15.415-15.415-15.414-40.498 0-55.912s40.497-15.415 55.91 0C93.37 37.46 93.37 62.54 77.957 77.956zm-40.6-46.996l-6.397 6.398L43.6 50 30.96 62.643l6.4 6.398L50 56.4 62.646 69.04l6.397-6.397L56.398 50 69.04 37.356l-6.397-6.398L50 43.6 37.356 30.96z"/></svg>
        </div>


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
