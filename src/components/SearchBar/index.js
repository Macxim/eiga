import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API_KEY, PATH_BASE, PATH_SEARCH, PATH_MOVIE } from '../../api';

import './index.css';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      result: null
    };

  }

  getSearchMovies = (searchTerm) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}?api_key=${API_KEY}&query=${searchTerm}`)
    .then(response => response.json())
    .then(result =>
      this.props.history.push(
        `/search?query=${searchTerm}`,
        result
      )
    );
  }

  handleSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.getSearchMovies(searchTerm);
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
        </form>
      </div>
    );

  }
}

export default withRouter(SearchBar);
