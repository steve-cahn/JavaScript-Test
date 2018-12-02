import React from 'react';

const Answer = props => {
	let answerClassName = '';

	if (props.shouldValidate) {
		if (props.index === props.answersToValidate.correct) answerClassName = 'answer-correct';
		else if (props.index === props.answersToValidate.selected) answerClassName = 'answer-wrong';
	}

	if (props.shouldValidate) answerClassName += ' disabled';
	return (
		<li className={answerClassName}>
			<input
				disabled={props.shouldValidate}
				type="radio"
				id={props.answerSymbol}
				name={props.name}
				onChange={() => props.handleChange(props.index)}
			/>
			<label htmlFor={props.answerSymbol} className="radio-symbol">
				<span>{props.answerSymbol}</span>
			</label>
			<label htmlFor={props.answerSymbol} className="answer-content">
				{props.answerContent}
			</label>
		</li>
	);
};

export default Answer;
