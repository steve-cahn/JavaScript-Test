import React from 'react';
import GithubLink from '../assets/svg_elements/GithubLink';
import '../Sass/header.scss';

const Header = props => {
	let stopWatchComponent;
	let feedbackClassName = 'feedback ' + props.type;

	if (props.shouldShowStopWatch) {
		stopWatchComponent = (
			<>
				<span className="stopWatch-time">{props.stopWatch}</span>
				<span className="title">Time Elapsed</span>
			</>
		);
	}

	if (props.showAlert) feedbackClassName += ' show ';

	return (
		<div className="header">
			<div className="stopWatch">{stopWatchComponent && stopWatchComponent}</div>
			<div className={feedbackClassName}>{props.feedbackText}</div>
			<GithubLink />
		</div>
	);
};

export default Header;
