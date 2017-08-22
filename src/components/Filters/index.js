import React, { Component } from 'react';
import InputRange from 'react-input-range';
import Dropdown from 'react-dropdown';

import './index.css';
import './filterRange.css';
import './filterDropdown.css';

class Filters extends Component {

  resetState = () => {
    this.props.resetFilters();
  }

  render () {

    const rangeDate = (start, end) => Array.from({length: (end - start)}, (value, key) => key + start+1).reverse();

    return (
      <div className="App-filters">
        Filters
        <button className="filters-reset" onClick={this.resetState}>
          <svg width="6" height="7" viewBox="0 0 6 7" xmlns="http://www.w3.org/2000/svg"><title>Reset</title><path d="M3.086 6.373c1.28-.144 2.31-1.17 2.455-2.45C5.734 2.245 4.43.818 2.798.8V.05c0-.043-.052-.065-.087-.04L1.16 1.15c-.025.02-.025.058 0 .077l1.55 1.137c.035.026.087.003.087-.038v-.75c1.148.018 2.067.995 1.988 2.162C4.72 4.74 3.9 5.554 2.895 5.618 1.833 5.686.93 4.926.766 3.92c-.03-.186-.192-.32-.38-.32-.234 0-.417.206-.38.437.227 1.432 1.55 2.507 3.08 2.336z"/></svg>
          <span className="filters-reset-label">Reset</span>
        </button>

        <ul className="filters-list">

          <li className="filters-list__item">
            <span className="filter-label">
              Year
            </span>
            <Dropdown
              options={rangeDate(1900, new Date().getFullYear())}
              value={`${this.props.filters.year}`}
              onChange={year => this.props.updateFilters({ ...this.props.filters, year: year.value })} />
          </li>

          <li className="filters-list__item">
            <span className="filter-label">
              Rating
            </span>
            <InputRange
              minValue={0}
              maxValue={10}
              value={this.props.filters.rating}
              onChange={rating => this.props.updateFilters({ ...this.props.filters, rating: rating })} />
          </li>

          <li className="filters-list__item">
            <span className="filter-label">
              Duration
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
