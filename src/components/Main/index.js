import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_MOVIE } from '../../api';
import List from '../../components/List';

import './index.css';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: {}
    };

  }

  componentDidMount = () => {
    this.getMovies(this.props.section)
  }

  getMovies = (section) => {
    fetch(`${PATH_BASE}${PATH_MOVIE}${section}?language=en-US&api_key=${API_KEY}`)
    .then(response => response.json())
    .then(movies => this.setMovies(movies));
  }

  setMovies = (movies) => {
    this.setState({
      movies: movies
    })
  }

  render () {

    const { movies } = this.state;
    const { results } = movies;

    return (
      <div>
        <h1 className="App-main-title">{this.props.title}</h1>
        { results &&
          <List list={results} />
        }
      </div>
    );

  }
}

export default Main;
