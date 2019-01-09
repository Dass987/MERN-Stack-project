import React, { Component } from 'react';

class NavBar extends Component {
	render() {
		return (
			<nav className="light-blue darken-4">
				<div className="container">
					<a href="/" className="brand-logo">MERN Stack</a>
				</div>
			</nav>
		);
	}
}

export default NavBar;