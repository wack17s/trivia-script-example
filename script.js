window.onload = function () {

	// counter of completed/skipped quesions
	let totalCount = 1;
	let correctAnswers = 0;
	let res;
	let elem = 0;
	let newID;
	let answer;

	function checkAnswer(answer) {
		let resAnswer = [];
		if (document.getElementsByClassName("get")[0].children[0]) {
			let char = document.getElementsByClassName("get")[0].children;

			for (let i = 0; i <= char.length - 1; i++) {
				resAnswer.push(document.getElementsByClassName("get")[0].children[i].innerHTML);
			}

			if (resAnswer.length === answer.split('').length) {
				if (resAnswer.join('') === answer) {
					alert('gj');
					correctAnswers++;
					next();
					elem = 0;
				} else {
					alert('nope');
					buildAnswer(answer);
					elem = 0;
				}
			}
		}
	}

	/**
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

	/**
	 * function that call req(); then check more than 1 word is answer
		 then call push();
	*/
	function render() {
		let midRes;
		let resArr = [];

		// check if answer has more than 1 word - skip it
		while (!resArr.length || resArr.length !== 1 || resArr[0].length > 6) {
			midRes = req();
			resArr = midRes[0].answer.split(' ');
		}

		// get params from response
		const question = midRes[0].question;
		answer = midRes[0].answer;
		const id = midRes[0].id;
		const category = midRes[0].category.title;
		newID = answer.length;

		// push question with next params
		push(question, id, answer, category);
	}

	render();

	/**
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
		document.getElementsByClassName("correct-answers")[0].innerHTML = 'Correct answers: ' + correctAnswers;
		document.getElementsByClassName("skip-button btn btn-primary")[0].onclick = skip;
	}

	/**
	 * function for get next question
	*/
	function next() {
		document.getElementsByClassName("total")[0].innerHTML = 'Total questions: ' + totalCount;
		document.getElementsByClassName("correct-answers")[0].innerHTML = 'Correct answers: ' + correctAnswers;
		++totalCount;
		render();
	}

	/**
	 * function for skip button
	*/
	function skip() {
		next();
	}

	/**
	 * 
	*/
	function pushChar(mouseEvent) {
		const btn1 = document.getElementsByClassName("get")[0];

		btn1.appendChild(mouseEvent.target);
		btn1.onclick = pushBack;

		checkAnswer(answer);
	}

	function pushBack(mouseEvent) {
		const btn1 = document.getElementsByClassName("push")[0];

		btn1.appendChild(mouseEvent.target);
		btn1.onclick = pushChar;
	}

	/**
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

			button.className = "getchar character";
			button.innerHTML = ' ';
			li.className = "inline-block";
			li.appendChild(button);
			ul1.className = "get inline-list totalAnswer";
		}

		for (let i = 0; i < answerArr.length; ++i) {
			const li = document.createElement("li");
			const button = document.createElement("button");

			button.className = "pushchar character";
			button.id = i;
			button.onclick = pushChar;
			button.innerHTML = answerArr[i];
			li.className = "inline-block";
			li.appendChild(button);
			ul2.className = "push inline-list proposition-characters-container";
			ul2.appendChild(li);
		}

		document.getElementsByClassName("ul1")[0].appendChild(ul1);
		document.getElementsByClassName("ul2")[0].appendChild(ul2);
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
}
