function req() {	
	const xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://jservice.io/api/random', false);
	xhr.send();


	if (xhr.status != 200) {
	  // обработать ошибку
	  console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
	} else {
	  const res = JSON.parse(xhr.responseText);
	  const question = res[0].question;
	  const answer = res[0].answer;
	  const id = res[0].id;
	  const category = res[0].category.title;


	  document.getElementsByClassName("question")[0].innerHTML = question;
	  document.getElementsByClassName("id")[0].innerHTML = 'QUESTION #' + id;
	  console.log(id + ': ' + answer);
	  document.getElementsByClassName("category")[0].innerHTML = 'Category: ' + category;
	}
}

req();

let totalCount = 0;

function skip() {
	document.getElementsByClassName("total")[0].innerHTML = 'Total questions: ' + totalCount;
	++totalCount;
	req();
}

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
}]