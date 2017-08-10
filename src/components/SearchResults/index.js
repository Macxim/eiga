import React, { Component } from 'react';
import List from '../../components/List';
import { API_KEY, PATH_BASE, PATH_MOVIE, PATH_SEARCH, DEFAULT_PAGE, PATH_PAGE } from '../../api';
import Button from '../../components/Button';


class SearchResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: {}
    };

  }

  componentDidMount = () => {
    this.getSearchMovies(this.props.match.params.searchTerm, DEFAULT_PAGE)
  }

  getSearchMovies = (searchTerm, page) => {
    const TERM = searchTerm.replace(/\s/g, '+');
    fetch(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}?api_key=${API_KEY}&query=${TERM}&${PATH_PAGE}${page}`)
    .then(response => response.json())
    .then(movies => {
      this.setSearchMovies(movies)
  });

  }

  setSearchMovies = (movies) => {
    const { results, page, total_pages, total_results } = movies;

    const oldResults = page !== 1
      ? this.state.movies.results
      : []

    const updatedResults = [
      ...oldResults,
      ...results
    ]

    this.setState({
      movies: {
        results: updatedResults, page, total_pages, total_results }
    })
  }

  render () {

    const { movies } = this.state;
    const { page } = movies;
    const searchTerm = this.props.match.params.searchTerm;

    return (
      <div>
        <h1 className="App-main-title">Search results</h1>
        { movies.results &&
        <div>
          <p>There are <b>{movies.total_results}</b> results for: "{searchTerm}".</p>
          <List list={movies.results} />
        </div>
        }
        <Button
          className="button"
          onClick={() => this.getSearchMovies(searchTerm, page + 1)}
          text="Load more"
         />
      </div>
    );
  }

}

export default SearchResults;
