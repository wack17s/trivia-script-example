// counter of completed/skipped quesions
let totalCount = 1;

let res;

/*
 * function that make request to http://jservice.io/api/random
 * @returns {array} res - array with one object of question params
*/
function req() {
	let res;
	const xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://jservice.io/api/random', false);
	xhr.send();


	if (xhr.status != 200) {
	  // обработать ошибку
	  console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
	} else {
	  res = JSON.parse(xhr.responseText);
	}

	return res;
}

/*
 * function that call req(); then check more than 1 word is answer
	 then call push();
*/
function render() {
	let midRes;
	let resArr = [];

	// check if answer has more than 1 word - skip it
	while (!resArr.length || resArr.length !== 1) {
		midRes = req();
		resArr = midRes[0].answer.split(' ');
	}

	// get params from response
	const question = midRes[0].question;
	const answer = midRes[0].answer;
	const id = midRes[0].id;
	const category = midRes[0].category.title;

	// push question with next params
	push(question, id, answer, category);
}

/*
 * function that push params into html page
 * @param {string} question - parsed question from http://jservice.io/api/random
 * @param {string} id - parsed id of question from http://jservice.io/api/random
 * @param {string} answer - parsed answer for question from http://jservice.io/api/random
 * @param {string} category - parsed category of question from http://jservice.io/api/random
*/
function push(question, id, answer, category) {
	buildAnswer(answer);

	document.getElementsByClassName("question")[0].innerHTML = question;
	document.getElementsByClassName("id")[0].innerHTML = 'QUESTION #' + id;
	console.log(id + ': ' + answer);
	document.getElementsByClassName("category")[0].innerHTML = 'Category: ' + category;
}

// here we render all our staff  
render();

/*
 * function for get next question
*/
function next() {
	document.getElementsByClassName("total")[0].innerHTML = 'Total questions: ' + totalCount;
	++totalCount;
	render();
}

/*
 * function for skip button
*/
function skip() {
	next();
}

/*
*/
function buildAnswer(answer) {	
	let answerArr  = answer.split('');
	shuffle(answerArr);

	if (document.getElementsByClassName("ul1")[0].children[0]) document.getElementsByClassName("ul1")[0].children[0].remove();
	if (document.getElementsByClassName("ul2")[0].children[0]) document.getElementsByClassName("ul2")[0].children[0].remove();

	const ul1 = document.createElement("ul");
	const ul2 = document.createElement("ul");	

	for (let i = 0; i < answerArr.length; ++i) {		
		const li = document.createElement("li");
		const button = document.createElement("button");

		button.className = "character";
		button.onClick = "console.log('lol')";
		button.innerHTML = ' ';
		li.className = "inline-block";
		li.appendChild(button);
		ul1.className = "inline-list proposition-characters-container";
		ul1.appendChild(li);
	}

	for (let i = 0; i < answerArr.length; ++i) {
		const li = document.createElement("li");
		const button = document.createElement("button");

		button.className = "character";
		button.id = i;
		button.onClick = pushChar(button.id);
		button.innerHTML = answerArr[i];
		li.className = "inline-block";
		li.appendChild(button);
		ul2.className = "inline-list proposition-characters-container";
		ul2.appendChild(li);
	}

	document.getElementsByClassName("ul1")[0].appendChild(ul1);
	document.getElementsByClassName("ul2")[0].appendChild(ul2);
}

function pushChar(answerChar) {
	onclick = (answerChar) => {
		alert(this.id);
  }

  return onclick;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

/*
 * example of response from http://jservice.io/api/random

const example = [{"id":33875,
"answer":"The Green Berets",
"question":"Hats off to JFK -- he authorized the formation of the elite special forces group, known as this",
"value":100,
"airdate":"1998-10-01T12:00:00.000Z",
"created_at":"2014-02-11T23:05:55.273Z",
"updated_at":"2014-02-11T23:05:55.273Z",
"category_id":3968,
"game_id":null,
"invalid_count":null,
"category":
	{"id":3968,
	"title":"the vietnam war",
	"created_at":"2014-02-11T23:05:55.198Z",
	"updated_at":"2014-02-11T23:05:55.198Z",
	"clues_count":16}
}]*/
