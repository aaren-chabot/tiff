import React from 'react';
import logo from '../images/logo-black.png';

class HeroMenu extends React.Component {
	state = {
		logoPath: '',
		logoAlt: 'Tiff Logo',
		tiffUrl: 'https://www.tiff.net'
	};

	render() {
		return (
			<div className="hero-menu">
				<div className="ui stackable menu">
					<a href="/">
						<div className="item">
							<img src={logo} alt={this.state.logoAlt} />
						</div>
					</a>
					<a className="item" href="/">Movies</a>
					<a className="item" href={this.state.tiffUrl}>Tiff Site</a>
				</div>
			</div>
		)
	};
}

export default HeroMenu;
