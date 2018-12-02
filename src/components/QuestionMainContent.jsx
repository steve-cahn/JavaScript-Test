import React, { Component } from 'react';
import Answer from './Answer';
import DataHandler from '../data';
import { feedback } from '../utils';
import '../Sass/questionMainContent.scss';

export default class QuestionMainContent extends Component {
	constructor() {
		super();
		this.dataHandler = new DataHandler();

		this.data = [];
		this.correctAnswer = 0;
		this.answersToValidate = { correct: 0, selected: 0 };
		this.isCorrect = false;
		this.answeredResults = [];
	}

	state = {
		dataCurrentIndex: 0, // Needs to be in state so that we can apply a unique key attr in answer component
		question: '',
		answers: [],
		shouldValidate: false,

		nextBtnText: 'Check',
		shouldDisableNextbtn: true
	};

	componentDidMount() {
		this.data = this.dataHandler.getDataByLevel(this.props.testLevel.toLowerCase(), true);
		this.goToNextQuestion();
		this.props.startStopWatch();
	}

	componentWillUnmount() {
		this.props.stopStopWatch();
	}

	handleAnswerChange = index => {
		this.answersToValidate.selected = index;
		this.setState({ shouldDisableNextbtn: false });
	};

	handleNextBtnClick = () => {
		if (this.state.nextBtnText === 'Check') {
			this.handleValidation();
		} else {
			this.goToNextQuestion();
			this.validateMode(false);
		}
	};

	handleValidation = () => {
		const { correct: correctAnswer, selected: selectedAnswer } = this.answersToValidate;

		this.isCorrect = correctAnswer === selectedAnswer;
		const feedbackText = feedback().getFeedbackText(this.isCorrect);
		const typeOfAlert = this.isCorrect ? 'good' : 'bad';

		this.answeredResults.push(this.isCorrect);
		this.props.showAlert(feedbackText, typeOfAlert);

		this.validateMode(true);
	};

	validateMode(shouldValidate) {
		const nextBtnText = shouldValidate ? 'Next' : 'Check';

		this.setState({
			nextBtnText,
			shouldValidate
		});
	}

	goToNextQuestion() {
		const { dataCurrentIndex } = this.state;

		if (this.data.length === dataCurrentIndex) {
			// Check if this is the last question
			this.endTestHandler();
		} else {
			const currentData = this.data[dataCurrentIndex];
			const answerData = this.dataHandler.getAnswersData(currentData);

			let question = currentData.question.split('\n');
			question = question.map((currentPart, index) => <span key={currentData + index}>{currentPart.trim()}</span>);

			this.answersToValidate.correct = answerData.correctAnswer;
			this.setState({
				question: question,
				answers: answerData.answers,
				shouldDisableNextbtn: true,
				dataCurrentIndex: dataCurrentIndex + 1
			});
		}
	}

	endTestHandler = () => {
		this.props.endTestHandler(this.answeredResults);
	};

	render() {
		return (
			<div className="main-content-wrapper">
				<QuestionContent
					dataCurrentIndex={this.state.dataCurrentIndex}
					question={this.state.question}
					answers={this.state.answers}
					handleAnswerChange={this.handleAnswerChange}
					answersToValidate={this.answersToValidate}
					shouldValidate={this.state.shouldValidate}
				/>
				<BottomButtons
					nextBtnText={this.state.nextBtnText}
					nextBtnOnClick={this.handleNextBtnClick}
					shouldDisableNextbtn={this.state.shouldDisableNextbtn}
					endTestHandler={this.endTestHandler}
				/>
			</div>
		);
	}
}

const QuestionContent = ({ question, answers, handleAnswerChange, answersToValidate, dataCurrentIndex, shouldValidate }) => {
	return (
		<div className="qtn-ans-wrapper">
			<h3 className="question">{question}</h3>
			<div className="answer-wrapper">
				<ul>
					{answers.map((answer, index) => {
						const answerSymbol = String.fromCharCode(65 + index);

						return (
							<Answer
								key={dataCurrentIndex + answerSymbol}
								index={index}
								name="answers"
								answerSymbol={answerSymbol}
								answerContent={answer}
								handleChange={handleAnswerChange}
								answersToValidate={answersToValidate}
								shouldValidate={shouldValidate}
							/>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

const BottomButtons = ({ nextBtnText, nextBtnOnClick, shouldDisableNextbtn, endTestHandler }) => {
	return (
		<div className="bottom-buttons">
			<button className="btn large next-btn" disabled={shouldDisableNextbtn} onClick={nextBtnOnClick}>
				{nextBtnText}
			</button>
			<button className="btn small end-test-btn" to="/results" onClick={e => endTestHandler(e)}>
				End Test
			</button>
		</div>
	);
};
