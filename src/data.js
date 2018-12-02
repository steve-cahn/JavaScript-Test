import { shuffleArray } from './utils';

const data = [
	{
		question: `What will be console output?
		let a = (x) => { return 7 }
		let b = (x) => { 7 }
		let c = (x) => 7;
		let d = x => 7;
		console.log( a(), b(), c(), d() );`,
		answers: ['7 7 7 7', '7 7 undefined 7', '7 7 7 undefined', '7 undefined 7 7'],
		correctAnswer: 3,
		level: 'hard'
	},
	{
		question: `What will the console say?
		console.log(NaN === NaN);`,
		answers: ['true', 'false'],
		correctAnswer: 1,
		level: 'hard'
	},
	{
		question: `What will you see in the console?
		x = 77;
		y = 51;
		var x = 76;
		let y = 78;
		console.log( [x, y] );`,
		answers: ['(2) [77, 51]', '(2) [77, 78]', '(2) [76, 78]', 'ReferenceError'],
		correctAnswer: 2,
		level: 'hard'
	},
	{
		question: `What will console say?
		var arr = [];
		arr[0]  = 'a';
		arr[1]  = 'b';
		arr["2"]  = 'c';
		arr.three = 'd';
		console.log ( arr.length++ );`,
		answers: ['2', '3', '4', '5'],
		correctAnswer: 1,
		level: 'hard'
	},
	{
		question: `What will x equal?
		let x = true + false * true + "1";`,
		answers: ['111', '101', '11', '01'],
		correctAnswer: 2,
		level: 'hard'
	},
	{
		question: `What will the output be?
		function aaa() {
			return { test: 1 };
		}
		console.log(typeof aaa());`,
		answers: ['function', 'number', 'object', 'undefined'],
		correctAnswer: 2,
		level: 'medium'
	},
	{
		question: `What will x equal?
		var x = "steve".split('');`,
		answers: [`['s', 't', 'e', 'v', 'e']`, `'steve'`, `{s: 's', t: 't', e: 'e', v: 'v', e: 'e'}`],
		correctAnswer: 0,
		level: 'medium'
	},
	{
		question: `What will arr1 equal?
		const arr1 = [(false == '0'), (false === '0')]`,
		answers: ['[true, true]', `[false, true]`, `[true, false]`, `[false, false]`],
		correctAnswer: 2,
		level: 'medium'
	},
	{
		question: `What will myFunc output?
		var x = 5;
		var myFunc = function () {
    		var x = 30;
			console.log(x);
		};
		myFunc ();`,
		answers: ['5', `30`, `undefined`],
		correctAnswer: 1,
		level: 'medium'
	},
	{
		question: `How do you add an element to an array?
		var arr1 = ['value1', 'value2', 'value3'];`,
		answers: [`arr1.add('value4')`, `arr1.push('value4')`, `arr1 + ['value4']`],
		correctAnswer: 1,
		level: 'easy'
	},
	{
		question: `What will the value of x equal?
		const x = typeof undefined == typeof null`,
		answers: ['true', 'false'],
		correctAnswer: 0,
		level: 'easy'
	},
	{
		question: `What will the value of aa equal?
		const aa = "1" == 1`,
		answers: ['true', 'false'],
		correctAnswer: 0,
		level: 'easy'
	},
	{
		question: `What will the value of y equal?
		const y = "34" === 34`,
		answers: ['true', 'false'],
		correctAnswer: 1,
		level: 'easy'
	},
	{
		question: `What will the value of xy output?
		const xy = true && 'orange'`,
		answers: ['undefined', 'true', 'false', 'orange'],
		correctAnswer: 3,
		level: 'medium'
	},

	{
		question: `What will the value of bb output?
		const bb = false && 'banana'`,
		answers: ['undefined', 'true', 'false', 'banana'],
		correctAnswer: 2,
		level: 'medium'
	},
	{
		question: `Is the follwoing allowed?
		const color = 'orange';
		color = 'blue';`,
		answers: ['Yes', 'No'],
		correctAnswer: 1,
		level: 'easy'
	}
	/*
	{
		question: `
		`,
		answers: [],
		correctAnswer: ,
		level: ''
	}
	*/
];

class DataHandler {
	/**
	 * Return all data, shuffled or not.
	 *
	 * @param {Boolean} shouldShuffle Should return shuffled data or not
	 */
	getAllData(shouldShuffle) {
		return shouldShuffle ? shuffleArray(data) : data;
	}

	/**
	 *  Returns the data with only the level specified. Can return shuffled
	 *
	 * @param {String} level Choose level of 'easy', 'meduim', or 'hard';
	 * @param {Boolean} shouldShuffle Should shuffle the data?
	 */
	getDataByLevel(level, shouldShuffle) {
		let filteredData = this.getAllData(shouldShuffle).filter(currentQuestion => currentQuestion.level === level);

		return filteredData;
	}

	/**
	 * Shuffles the answers for the current data and gets
	 * the correct answers index
	 *
	 * @param {Object} currentData Single data from the data array.
	 * @returns {Object} Shuffled answers and correct answers index
	 */
	getAnswersData(currentData) {
		// Setup object syntax
		let currentAnswersData = { answers: [], correctAnswer: 0 };

		// Adds the shuffled answers to object
		currentAnswersData.answers = shuffleArray(currentData.answers);

		// Get text of correct answer
		const correctAnswerText = currentData.answers[currentData.correctAnswer];

		// Get the index of the correct answer from the shuffled answers array
		currentAnswersData.correctAnswer = currentAnswersData.answers.indexOf(correctAnswerText);

		return currentAnswersData;
	}
}

export default DataHandler;
