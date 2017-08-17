import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_DISCOVER, PATH_MOVIE, DEFAULT_PAGE, PATH_PAGE } from '../../api';
import List from '../../components/List';
import Button from '../../components/Button';

import './index.css';

class Discover extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: {},
    };

  }

  componentDidMount = () => {
    this.getMovies(DEFAULT_PAGE);
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.getMovies(DEFAULT_PAGE)
  }

  getMovies = (page) => {
    fetch(`
      ${PATH_BASE}${PATH_DISCOVER}${PATH_MOVIE}?api_key=${API_KEY}&${PATH_PAGE}${page}
      &language=en-US
      &primary_release_year=${this.props.filters.year}
      &vote_average.gte=${this.props.filters.rating.min}
      &vote_average.lte=${this.props.filters.rating.max}
      &with_runtime.gte=${this.props.filters.runtime.min}
      &with_runtime.lte=${this.props.filters.runtime.max}
      &sort_by=vote_average.desc`
    )
    .then(response => response.json())
    .then(movies => {
      this.setMovies(movies)
    });
  }

  setMovies = (movies) => {
    const { results, page } = movies;

    const oldResults = page !== 1
      ? this.state.movies.results
      : []

    const updatedResults = [
      ...oldResults,
      ...results
    ]

    this.setState({
      movies: { results: updatedResults, page }
    })
  }

  toggleFilters = () => {
    this.props.toggleFilters();
  }

  render () {

    const { movies } = this.state;
    const { results, page } = movies;

    return (
      <div>
        <h1 className="App-main-title">{this.props.title}</h1>
        <p>Movies with ratings from {this.props.filters.rating.min} to {this.props.filters.rating.max} released in {this.props.filters.year} with runtime from {this.props.filters.runtime.min} to {this.props.filters.runtime.max} minutes.</p>
        <Button className="" onClick={this.toggleFilters} text="Filters" />
        { results &&
          <List list={results} />
        }
        <Button
          className="button"
          onClick={() => this.getMovies(page + 1)}
          text="Load more"
         />
      </div>
    );

  }
}

export default Discover;
