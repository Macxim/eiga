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
      pathname: `/search?query=${searchTerm}`,
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
        </form>
      </div>
    );

  }
}

export default withRouter(SearchBar);
