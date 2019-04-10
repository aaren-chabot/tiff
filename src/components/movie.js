import React from 'react';
import movieIcon from '../images/movie-icon.png';
import {tiffApi, tiffApiKey} from "../api/tiff";

class Movie extends React.Component {
	state = {
		isHovered: false,
		showDetails: false,
		showCastList: false,
		showMovieDetails: false,
		showCastMember: false,
		genres: [],
		title: '',
		tagline: '',
		runtime: null,
		overview: '',
		cast: [],
		selectedCast: {
			name: '',
			movies: []
		}
	};

	onMouseEnterCard = () => {
		this.setState({ isHovered: true });
	};

	onMouseLeaveCard = () => {
		this.setState({ isHovered: false });
	};

	onToggleCastDetails = () => {
			tiffApi.get(`/movie/${this.props.id}/credits`, {
				params: {
					'api_key': tiffApiKey
				}
			}).then(castDetails => {
				this.setState({
					cast: castDetails.data.cast.map(o => {
						return {
							name: o.name,
							character: o.character,
							id: o.id
						}
					}),
					showCastList: true,
					showCastMember: false,
					showMovieDetails: false
				});
			});
	};

	onSelectCastMember = (id, name) => {
		tiffApi.get(`/person/${id}/movie_credits`, {
			params: {
				'api_key': tiffApiKey
			}
		}).then(castDetail => {
			this.setState({
				selectedCast: {
					name: name,
					movies: castDetail.data.cast.map(o => {
						return {
							title: o.title,
							character: o.character
						}
					})
				},
				showCastList: false,
				showMovieDetails: false,
				showCastMember: true
			});
		});
	};

	onToggleMovieDetails = () => {
		this.setState({
			showCastList: false,
			showMovieDetails: true,
			showCastMember: false
		});
	};

	onShowDetailsClick = () => {
		tiffApi.get(`/movie/${this.props.id}`, {
			params: {
				'api_key': tiffApiKey
			}
		}).then(response => {
			const {genres, title, runtime, overview, tagline} = response.data;
			this.setState({
				genres: genres.map(o => o.name),
				title,
				runtime,
				overview,
				tagline,
				showDetails: !this.state.showDetails,
				showMovieDetails: true
			});
		})
	};

	render() {
		return (
			<div className={`card movie ${ this.state.isHovered ? 'dimmed': '' }`}
					 id={ this.props.id }
					 onMouseEnter={ this.onMouseEnterCard }
					 onMouseLeave={ this.onMouseLeaveCard }>
				<div className={`blurring dimmable image ${ this.state.isHovered ? 'dimmed': '' }`}>
					<div className={`content-container ui inverted dimmer transition ${ this.state.isHovered ? 'visible active': 'hidden' }`}>
						<div className="content">
							<div className={`details ${ this.state.showDetails ? '' : 'hide' }`}>
								<div className={`button-group`}>
									<button
										className="details-toggle"
										onClick={this.onToggleCastDetails}>
										Cast Details
									</button>
									<button
										className="details-toggle"
										onClick={this.onToggleMovieDetails}>
										Movie Details
									</button>
								</div>

								<div className={`${ this.state.showMovieDetails ? '' : 'hide' }`}>
									{this.state.title ? <h3 className="header">{this.state.title}</h3>: ''}
									{this.state.overview ? <div className="description"><span className="bold">Overview:</span> {this.state.overview}</div>: ''}
									{this.state.genres && this.state.genres.length > 0 ? <div className="description"><span className="bold">Genres:</span> {this.state.genres.join(', ')}</div>: ''}
									{this.state.tagline ? <div className="description"><span className="bold">Tag Line:</span> {this.state.tagline}</div>: ''}
									{this.state.runtime ? <div className="description"><span className="bold">Runtime:</span> {this.state.runtime} mins</div>: ''}
								</div>

								<div className={`${ this.state.showCastList ? '' : 'hide' }`}>
									<h3 className="header">Cast:</h3>
									<h5 className="sub-header">Click to see more from:</h5>
									{/*TODO: SPLIT THIS INTO NEW COMP*/}
									{this.state.cast.map(person =>
										<div
											id={person.id}
											key={person.id}
											onClick={() => this.onSelectCastMember(person.id, person.name)}
											className="cast description">{person.name} as {person.character}</div>)}
								</div>

								<div className={`${ this.state.showCastMember ? '' : 'hide' }`}>
									<h3 className="header">{this.state.selectedCast.name}:</h3>
									<h5 className="sub-header">Other Movies:</h5>
									{/*TODO: SPLIT THIS INTO NEW COMP*/}
									<ul>
									{this.state.selectedCast.movies.map((actor, idx) =>
										<li key={idx} className="cast movie description">{actor.character} in {actor.title}</li>)}
									</ul>
								</div>

							</div>
							<div className={`center ${ this.state.showDetails ? 'hide': '' }`}>
								<div className="ui primary button"
										 onClick={this.onShowDetailsClick}>
									<img alt="Click to see movie details"
											 src={movieIcon}
											 className="movie-icon" />
									See Details
								</div>
							</div>
						</div>
					</div>
					{this.props.image.includes('null') ? <div className="missingImage"><h2>{this.props.title}</h2></div>: <img alt="poster" src={ this.props.image } />}
				</div>
			</div>
		);
	}
}

export default Movie;
