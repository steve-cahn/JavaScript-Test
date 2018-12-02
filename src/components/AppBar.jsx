import React from 'react';
import '../Sass/appBar.scss';
import logoOutline from '../assets/logo_outline.png';

const AppBar = props => {
	return (
		<div className="appBar">
			<img src={logoOutline} alt="JavaScript Test" width="55" />
			<div className="level-wrapper">
				<span className="level-title">Level: </span>
				<span className="level">{props.testLevel}</span>
			</div>
		</div>
	);
};

export default AppBar;
