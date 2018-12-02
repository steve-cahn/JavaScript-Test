export const shuffleArray = array => {
	// Create deep copy of array
	let tempArray = [...array];

	for (let i = tempArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
	}

	return tempArray;
};

export const noFunc = () => {};

export class StopWatch {
	constructor(getTimeCallback) {
		this.getTimeCallback = getTimeCallback || noFunc;
		this.hours = 0;
		this.minutes = 0;
		this.seconds = 0;
		this.startTimer = null;
	}

	start(callback) {
		const currentStartTime = Math.floor(Date.now() / 1000); //Get the starting time (right now) in seconds

		const timerHandler = () => {
			const now = Math.floor(Date.now() / 1000);
			const diff = now - currentStartTime;

			this.hours = Math.floor(diff / 3600);
			this.minutes = Math.floor((diff - this.hours * 3600) / 60);
			this.seconds = diff - (this.hours * 3600 + this.minutes * 60);
			this.seconds = addLeadZero(this.seconds);
			this.minutes = addLeadZero(this.minutes);

			// If 'this.getTimeCallback' wasn't defined, and 'callback' is,
			// assign callback to 'this.getTimeCallback
			if (this.getTimeCallback === noFunc && typeof callback === 'function') this.getTimeCallback = callback;

			this.getTimeCallback(this.getTime());
		};

		const addLeadZero = num => {
			if (num < 10) {
				num = '0' + num;
			} // add zero in front of numbers < 10
			return num;
		};

		this.startTimer = setInterval(timerHandler, 1000);
	}

	stop() {
		clearInterval(this.startTimer);
	}

	getTime() {
		const { hours, minutes, seconds } = this;
		return { hours, minutes, seconds };
	}
}

export const feedback = () => {
	const feedbackCollection = {
		correct: [
			"That's right. You selected the correct answer.",
			'You got the correct answer!',
			'Way to go!',
			'Good Job!',
			'You rock!',
			'Super job!',
			'Great!',
			'Thumbs Up!',
			'Well done!'
		],
		wrong: [
			'Wrong answer.',
			"That's not correct.",
			"That's wrong.",
			'Sorry, not this time.',
			'Not quite.',
			'We all get some things wrong at times.',
			'Wrong. Try harder next time.',
			'That answer is not correct.',
			'Nopes'
		]
	};

	const getFeedbackText = isCorrect => {
		const currentFeedbackCollection = isCorrect ? feedbackCollection.correct : feedbackCollection.wrong;
		const feedbackText = currentFeedbackCollection[Math.floor(Math.random() * feedbackCollection.correct.length)];

		return feedbackText;
	};

	return { getFeedbackText };
};
