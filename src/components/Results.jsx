import React, { Component } from 'react';
import WinnerTrophy from '../assets/svg_elements/WinnerTrophy';
import Frown from '../assets/svg_elements/Frown';
import { Link } from 'react-router-dom';
import '../Sass/results.scss';

class Results extends Component {
	render() {
		const { answeredResults, endTime } = this.props;

		// Create false results
		//const answeredResults = [false, false, true, true, true, true];
		const questionQty = answeredResults.length;

		let componentToDisplay;
		let btnText = '';

		// Got to this page wihtout taking the test
		if (questionQty === 0) {
			componentToDisplay = <NoResultsComponent />;
			btnText = 'Take the Test';
		} else {
			componentToDisplay = <ResultsComponent answeredResults={answeredResults} endTime={endTime} />;
			btnText = 'Play Again';
		}

		return (
			<div className="results-wrapper">
				{componentToDisplay}
				<Link to="/" className="btn med play-again-btn">
					{btnText}
				</Link>
			</div>
		);
	}
}

export default Results;

const ResultsComponent = ({ answeredResults, endTime }) => {
	const questionQty = answeredResults.length;
	let correct = 0;
	answeredResults.forEach(isCorrect => {
		isCorrect && correct++;
	});
	const wrong = questionQty - correct;
	const percentage = Math.round((correct / questionQty) * 100);
	const didPass = percentage >= 70;

	let imageComponent;
	let titleText = '';

	if (didPass) {
		imageComponent = <WinnerTrophy />;
		titleText = 'You Passed!';
	} else {
		imageComponent = <Frown />;
		titleText = 'Sorry You Failed';
	}

	return (
		<>
			{imageComponent}
			<h1 className="title">{titleText}</h1>
			<h2 className="score-percentage">
				You Scored <span>{percentage}%</span> in <span>{endTime}</span>
			</h2>
			<div className="stats-result">
				You got{' '}
				<span className="correct">
					<span className="stat-qty">{correct}</span> correct
				</span>{' '}
				and{' '}
				<span className="wrong">
					<span className="stat-qty">{wrong}</span> Wrong
				</span>
			</div>
		</>
	);
};

const NoResultsComponent = () => {
	return <h1>Doesn't seem like you took the test yet.</h1>;
};
