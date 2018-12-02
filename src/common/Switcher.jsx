import React from 'react';
import './switcher.scss';

const Switcher = props => {
	const groupName = props.groupName || 'switcher';
	const selected = props.index === 0;

	return (
		<li className="switcher-element">
			<input
				defaultChecked={selected}
				type="radio"
				name={groupName}
				id={props.index}
				onChange={() => props.levelChangeHandler(props.index)}
			/>
			<label htmlFor={props.index} className="switcher-label">
				{props.text}
			</label>
		</li>
	);
};

export default Switcher;
