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

  toggleFilters = () => {
    this.props.toggleFilters();
  }

  render () {

    const { movies } = this.state;
    const { results, page } = movies;
    const toggleFiltersClasses = `filters-toggle-icon ${this.props.filtersOpen ?  'is-open' : '' }`;

    return (
      <div className="Main-wrapper">

        <svg onClick={this.toggleFilters} className={toggleFiltersClasses} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125"><path d="M40.834 19.94v7H93v-7H40.834zm-25.383 0H7v7h8.45v-7zM7 80.06h53.208v-7H7v7zM37.834 46.5H7v7h30.834v-7zM84.25 80.06H93v-7h-8.75v7zM62.375 53.5H93v-7H62.375v7zm-5.953 4.922c1.104 0 2-.896 2-2V43.58c0-1.105-.896-2-2-2h-12.84c-1.103 0-2 .895-2 2V56.42c0 1.104.897 2 2 2h12.84zM21.58 32.107h12.84c1.103 0 2-.896 2-2V17.264c0-1.104-.897-2-2-2H21.58c-1.104 0-2 .896-2 2v12.843c0 1.105.896 2 2 2zM78.42 68.14H65.58c-1.104 0-2 .896-2 2v12.843c0 1.104.896 2 2 2h12.84c1.103 0 2-.896 2-2V70.14c0-1.105-.897-2-2-2z"/></svg>

        <h1 className="App-main-title">{this.props.title}</h1>
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
