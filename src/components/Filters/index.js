import React, { Component } from 'react';
import InputRange from 'react-input-range';

import './index.css';

class Filters extends Component {

  constructor(props) {
    super(props);

    this.state = {
      valueRating: {
        min: 0,
        max: 10
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
              Rating from {this.state.valueRating.min} to {this.state.valueRating.max}
            </span>
            <InputRange
              maxValue={10}
              minValue={0}
              value={this.state.valueRating}
              onChange={value => this.setState({ valueRating: value })}
              onChangeComplete={value => console.log(value)} />
          </li>
        </ul>
      </div>
    );

  }
}

export default Filters;
