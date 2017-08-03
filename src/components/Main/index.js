import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_POPULAR, PATH_MOVIE } from '../../api';

import './index.css';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      popularMovies: {}
    };

  }

  componentDidMount = () => {
    this.getPopularMovies()
  }

  getPopularMovies = () => {
    fetch(`${PATH_BASE}${PATH_MOVIE}${PATH_POPULAR}?language=en-US&api_key=${API_KEY}`)
    .then(response => response.json())
    .then(popularMovies => this.setPopularMovies(popularMovies));
  }

  setPopularMovies = (popularMovies) => {
    this.setState({
      popularMovies: popularMovies
    })

    console.log(this.state);
  }

  render () {

    return (
      <div>
        <h1 className="App-main-title">{this.props.title}</h1>
      </div>
    );

  }
}

export default Main;
