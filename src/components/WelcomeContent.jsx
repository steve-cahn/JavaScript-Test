import React from 'react';
import { Link } from 'react-router-dom';
import Switcher from '../common/Switcher';
import DeveloperCoding from '../assets/svg_elements/DevCoding';
import '../Sass/welcomeContent.scss';

const WelcomContent = props => {
	const levels = ['Easy', 'Medium', 'Hard'];

	return (
		<div className="welcome-content">
			<div className="level-container">
				<h3>Choose Your Level</h3>
				<ul className="switcher-container">
					{levels.map((levelText, index) => {
						return (
							<Switcher
								key={`switcher${index}`}
								text={levelText}
								index={index}
								levelChangeHandler={props.levelChangeHandler}
							/>
						);
					})}
				</ul>
				<DeveloperCoding />
			</div>

			<Link className="btn large" to="/test">
				Begin
			</Link>
		</div>
	);
};

export default WelcomContent;
