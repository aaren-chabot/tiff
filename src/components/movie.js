import React from 'react';
import movieIcon from '../images/movie-icon.png';

class Movie extends React.Component {
	state = {
		isHovered: false,
		showDetails: false
	};

	onMouseEnterCard = () => {
		this.setState({ isHovered: true });
	};

	onMouseLeaveCard = () => {
		this.setState({ isHovered: false });
	};

	onButtonClick = () => {
		this.setState({ showDetails: !this.state.showDetails });
	};

	render() {
		return (
			<div className={`col-xs-12 card movie ${ this.state.isHovered ? 'dimmed': '' }`}
					 id={ this.props.id }
					 onMouseEnter={ this.onMouseEnterCard }
					 onMouseLeave={ this.onMouseLeaveCard }>
				<div className={`blurring dimmable image ${ this.state.isHovered ? 'dimmed': '' }`}>
					<div className={`ui inverted dimmer transition ${ this.state.isHovered ? 'visible active': 'hidden' }`}>
						<div className="content">
							<div className={`details ${ this.state.showDetails ? '' : 'hidden' }`}>
								{this.props.title ? <h3 className="header">{this.props.title}</h3>: ''}
								{this.props.overview ? <div className="description"><span className="bold">Overview:</span> {this.props.overview}</div>: ''}
								{this.props.genres && this.props.genres.length > 0 ? <div className="description"><span className="bold">Genres:</span> {this.props.genres.join(', ')}</div>: ''}
								{this.props.tagLine ? <div className="description"><span className="bold">Tag Line:</span> {this.props.tagLine}</div>: ''}
								{this.props.runTime ? <div className="description"><span className="bold">Runtime:</span> {this.props.runTime}</div>: ''}
							</div>
							<div className={`center ${ this.state.showDetails ? 'hidden': '' }`}>
								<div className="ui primary button"
										 onClick={this.onButtonClick}>
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
