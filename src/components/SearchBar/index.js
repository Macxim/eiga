import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './index.css';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };

  }

  handleSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.props.history.push({
      pathname: `/search`,
      search: `?query=${searchTerm}`
      }
    )
  }

  render () {

    const { searchTerm } = this.state;

    return (
      <div className="SearchBar-wrapper">
        <form onSubmit={this.handleSearchSubmit}>
          <input
            className="search-movie-input"
            type="text"
            placeholder="Search movies..."
            onChange={this.handleSearchChange}
            value={searchTerm}
          />
          <svg className="search-movie-input-icon" viewBox="0 0 26 27" xmlns="http://www.w3.org/2000/svg"><title>search</title><path d="M25.64 24.562l-6.42-6.675c1.65-1.962 2.555-4.43 2.555-7C21.775 4.885 16.89 0 10.888 0 4.884 0 0 4.884 0 10.888c0 6.003 4.884 10.887 10.888 10.887 2.253 0 4.4-.68 6.237-1.97l6.467 6.725c.27.28.634.436 1.023.436.37 0 .72-.14.984-.396.564-.543.582-1.444.04-2.008zM10.887 2.84c4.437 0 8.047 3.61 8.047 8.048 0 4.437-3.61 8.047-8.047 8.047-4.438 0-8.048-3.61-8.048-8.047 0-4.438 3.61-8.048 8.048-8.048z" /></svg>
        </form>
      </div>
    );

  }
}

export default withRouter(SearchBar);
