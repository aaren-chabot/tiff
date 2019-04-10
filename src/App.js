import React, { Component } from 'react';
import MovieList from './components/movie-list';
import HeroMenu from './components/hero-menu';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeroMenu />
        <MovieList />

      </div>
    );
  }
}

export default App;
