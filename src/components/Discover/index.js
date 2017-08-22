import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_DISCOVER, PATH_MOVIE, DEFAULT_PAGE, PATH_PAGE } from '../../api';
import List from '../../components/List';
import Button from '../../components/Button';
import Dropdown from 'react-dropdown';

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
    if (prevProps !== this.props){
      this.getMovies(DEFAULT_PAGE)
    }
  }

  getMovies = (page) => {
    fetch(`
      ${PATH_BASE}${PATH_DISCOVER}${PATH_MOVIE}?api_key=${API_KEY}&${PATH_PAGE}${page}
      &language=en-US&region=us&include_adult=false&vote_count.gte=200
      &primary_release_year=${this.props.filters.year}
      &vote_average.gte=${this.props.filters.rating.min}
      &vote_average.lte=${this.props.filters.rating.max}
      &with_runtime.gte=${this.props.filters.runtime.min}
      &with_runtime.lte=${this.props.filters.runtime.max}
      &sort_by=${this.props.filters.sort_by.value}.${this.props.filters.order.value}`
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

  render () {

    const { movies } = this.state;
    const { results, page } = movies;
    const sort_by = [
      { value: 'popularity', label: 'Popularity' },
      { value: 'vote_average', label: 'Rating' },
      { value: 'original_title', label: 'Original Title' }];
    const sort_by_order = [
      { value: 'asc', label: 'Ascending' },
      { value: 'desc', label: 'Descending' }
    ];

    return (
      <div className="Main-wrapper">
        <h1 className="App-main-title Discover-main-title">{this.props.title}</h1>
        <h2 className="discover-tagline">— browse movies by year, ratings and duration.</h2>

        <div className="sort-order">
          <div className="sort-order__item">
            <span className="sort-order-label">Sort by</span>
            <Dropdown
              className="test"
              options={sort_by}
              value={`${this.props.filters.sort_by.label}`}
              onChange={sort_by => this.props.updateFilters({ ...this.props.filters, sort_by: sort_by })} />
          </div>
          <div className="sort-order__item">
            <span className="sort-order-label">Order by</span>
            <Dropdown
              className="test"
              options={sort_by_order}
              value={`${this.props.filters.order.label}`}
              onChange={order => this.props.updateFilters({ ...this.props.filters, order: order })} />
          </div>
        </div>



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
