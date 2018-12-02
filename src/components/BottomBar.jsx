import React from 'react';
import '../Sass/bottomBar.scss';
import logo from '../assets/logo_outline.png';

const BottomBar = props => {
	return (
		<div className="bottom-bar">
			<img src={logo} alt="JavaScript Test" width="55" height="55" />
		</div>
	);
};

export default BottomBar;
