import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AppBar from './AppBar';
import Header from './Header';
import WelcomContent from './WelcomeContent';
import QuestionMainContent from './QuestionMainContent';
import Results from './Results';
import BottomBar from './BottomBar';
import NotFound from '../common/NotFound';
import { StopWatch } from '../utils';
import '../Sass/app.scss';
import '../Sass/_normalize.scss';

class App extends Component {
	constructor() {
		super();
		this.stopWatch = new StopWatch();

		this.answeredResults = [];
	}

	state = {
		// Header State
		stopWatch: '0:00',
		shouldShowStopWatch: false,

		alertText: '',
		shouldShowAlert: false,
		alertType: 'good', // Accepted Values: 'good', 'bad', or 'none'

		testLevel: 0
	};

	startStopWatchHandler = () => {
		this.stopWatch.start(time => {
			let stopWatchTime = '';

			// Check if hours is 0
			if (Number(time.hours) !== 0) stopWatchTime += `${time.hours}:`;
			stopWatchTime += `${time.minutes}:${time.seconds}`;

			this.setState({ stopWatch: stopWatchTime });
		});
		this.setState({ shouldShowStopWatch: true });
	};

	stopStopWatchHandler = () => {
		this.stopWatch.stop();
		this.setState({ shouldShowStopWatch: false });
	};

	/**
	 * Displayes the alert by header. This alert is a fixed element.
	 *
	 * @param {String} text The text you want the alert to display
	 * @param {String} type Accepts 'good', 'bad', or, 'none'
	 * @param {Boolean} type true = 'good'; false = 'bad'
	 */
	showAlert = (text, type) => {
		if (typeof type === 'boolean') {
			type = type ? 'good' : 'bad';
		} else if (typeof type !== 'string') type = '';

		this.setState({ alertText: text, alertType: type, shouldShowAlert: true });

		setTimeout(() => {
			this.setState({ shouldShowAlert: false });
		}, 2000);
	};

	levelChangeHandler = testLevel => {
		this.setState({ testLevel });
	};

	endTestHandler = answeredResults => {
		this.answeredResults = answeredResults;
		this.props.history.push('/results');
	};

	render() {
		const levels = ['Easy', 'Medium', 'Hard'];
		const currentLevel = levels[this.state.testLevel];

		return (
			<div className="App">
				<div className="bg" />
				<AppBar testLevel={currentLevel} />
				<Header
					showAlert={this.state.shouldShowAlert}
					feedbackText={this.state.alertText}
					type={this.state.alertType}
					stopWatch={this.state.stopWatch}
					shouldShowStopWatch={this.state.shouldShowStopWatch}
				/>

				<Switch>
					<Route
						path="/test"
						render={() => (
							<QuestionMainContent
								testLevel={currentLevel}
								showAlert={this.showAlert}
								startStopWatch={this.startStopWatchHandler}
								stopStopWatch={this.stopStopWatchHandler}
								endTestHandler={this.endTestHandler}
							/>
						)}
					/>
					<Route
						path="/results"
						render={() => <Results endTime={this.state.stopWatch} answeredResults={this.answeredResults} />}
					/>
					<Route path="/404" component={NotFound} />
					<Route path="/" exact render={() => <WelcomContent levelChangeHandler={this.levelChangeHandler} />} />
					<Redirect to="/404" />
				</Switch>

				<BottomBar />
			</div>
		);
	}
}

export default withRouter(App);
