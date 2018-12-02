import React from 'react';
import BackArrow from '../assets/svg_elements/BackArrow';
import './notFound.scss';

const NotFound = props => {
	return (
		<div className="not-found">
			<h1>404</h1>
			<div className="details">Sorry! The page you were looking for can not be found.</div>
			<button className="go-back-btn btn small" onClick={props.history.goBack}>
				<BackArrow fill="green" />
				<span>Go Back</span>
			</button>
		</div>
	);
};

export default NotFound;
