import React from 'react';
import {tiffApi, tiffApiKey} from '../api/tiff';
import Movie from './movie';
import helpers from '../helpers/index';

class MovieList extends React.Component {
	state = {
		movies: [],
		genres: []
	};

	componentDidMount = () => {
		(() => {
			tiffApi.get('/genre/movie/list', {
				params: {
					'api_key': tiffApiKey
				}
			}).then(response => {
				this.setState({genres: response.data.genres})
			})
		})();

		(async () => {
			const promises = [];

			(await function buildCalls() {
				for (let i = 0; i < 8; i++) {
					const orderPromise = tiffApi.get('/discover/movie', {
						params: {
							'api_key': tiffApiKey,
							'sort_by': 'popularity.desc',
							'primary_release_year': 2019,
							'page': i + 1
						}
					});
					promises.push(orderPromise);
				}
			})();
			await Promise.all(promises).then(obj => {
				// Filtered List of Movies
				const data = obj.map(call => call.data.results).flat().filter(movie => movie.popularity > 10);

				// Sorted Data
				const sortedData =  helpers.sort.sortByDate(data, 'release_date');

				// Replace Genres with Names
				const sortedAndGenreData = sortedData.map(movie => {
					return {...movie,
						genre_ids: this.state.genres.filter(genre => {
						return movie.genre_ids.includes(genre.id)
					}).map(genreObj => genreObj.name)
					}
				});

				// Set state
				this.setState({movies: sortedAndGenreData});
			});
		})();
	};


	render() {
		return (

		<div className="movie-list">
				<h1>Movie List: {this.state.movies.length} total movies from 2019.</h1>
				<div className="ui special cards">
					{this.state.movies.map(movie => {
						return <Movie
							key={movie.id}
							id={movie.id}
							title={movie.title}
							overview={movie.overview}
							genres={movie.genre_ids}
							image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							tagLine={movie.tagLine}
							runTime={movie.runTime} />
					})}
				</div>
			</div>
		);
	}
}

export default MovieList;
