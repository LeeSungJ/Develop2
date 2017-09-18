var titleFormat = /^[A-Z]{1}[A-Za-z]{2,59}$/;
var dateFormat = /^(20[1-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
var stringFormat = /^[A-Z]{1}[A-Za-z]{2,4}$/;
var genreFormat = /^[A-Z]{1}[A-Za-z]{1,29}$/;
var priceFormat = /^[0-9]{1,2}$/;

function jsonToUrlString(json) {
	var string = '';

	string = Object.keys(json).map(function (key) {
		return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
	}).join('&');

	return string;
};

function validation(data) {

	var result = "";

	if (titleFormat.test(data.Title) === false || dateFormat.test(data.ReleaseDate) === false || genreFormat.test(data.Genre) === false || priceFormat.test(data.Price) === false || stringFormat.test(data.Rating) === false || stringFormat.test(data.Review) === false) {
		if (titleFormat.test(data.Title) === false) {
			result += "Title: 첫 문자는 대문자, 글자 수 유의.(ex.Title, 3~60자)<br/>";
		}
		if (dateFormat.test(data.ReleaseDate) === false) {
			result += "ReleaseDate: 날짜를 올바르게 입력해 주세요(ex. 2011- 11 - 11) <br/>";
		}
		if (genreFormat.test(data.Genre) === false) {
			result += "Genre: 첫 문자는 대문자, 글자 수 유의.(ex.Action, 3~30자)<br/>";
		}
		if (priceFormat.test(data.Price) === false) {
			result += "Pirce: 숫자만 입력 가능.(99까지 가능)<br/>";
		}
		if (stringFormat.test(data.Rating) === false) {
			result += "Rating: 첫 문자는 대문자, 글자 수 유의.(ex.Five, 3~5자)<br/>";
		}
		if (stringFormat.test(data.Review) === false) {
			result += "Review: 첫 문자는 대문자, 글자 수 유의.(ex.Good, 3~5자)<br/>";
		}
		$('#validationResult').html(result);
		return false;
	}
	return true;
};

function titleCheck(value) {
	var title = value;
	if (titleFormat.test(title) === false) {
		$('#checkTitle').text("첫 문자는 대문자, 3 ~ 60자");
	} else {
		$('#checkTitle').text("");
		$('#validationResult').html("");
	}
}

function dateCheck(value) {
	var date = value;
	if (dateFormat.test(date) === false) {
		$('#checkReleaseDate').text("날짜를 올바르게 입력해 주세요(ex. 2011-11-11)");
	} else {
		$('#checkReleaseDate').text("");
		$('#validationResult').html("");
	}
}

function genreCheck(value) {
	var genre = value;
	if (genreFormat.test(genre) === false) {
		$('#checkGenre').text("첫 문자는 대문자, 3 ~ 60자");
	} else {
		$('#checkGenre').text("");
		$('#validationResult').html("");
	}
}

function priceCheck(value) {
	var price = value;
	if (priceFormat.test(price) === false) {
		$('#checkPrice').text("Price는 숫자만 입력 가능.(99까지 가능)");
	} else {
		$('#checkPrice').text("");
		$('#validationResult').html("");
	}
}

function ratingCheck(value) {
	var rating = value;
	if (stringFormat.test(rating) === false) {
		$('#checkRating').text("첫 문자는 대문자, 3 ~ 5자");
	} else {
		$('#checkRating').text("");
		$('#validationResult').html("");
	}
}

function reviewCheck(value) {
	var review = value;
	if (stringFormat.test(review) === false) {
		$('#checkReview').text("첫 문자는 대문자, 3 ~ 5자");
	} else {
		$('#checkReview').text("");
		$('#validationResult').html("");
	}
}

function titleKeyup() {
	var title = $('#title').val();

	if (title !== '') {
		titleCheck(title);
	}
}
function dateKeyup() {
	var date = $('#releaseDate').val();

	if (date !== '') {
		dateCheck(date);
	}
}
function genreKeyup() {
	var genre = $('#genre').val();

	if (genre !== '') {
		genreCheck(genre);
	}
}
function priceKeyup() {
	var price = $('#price').val();

	if (price !== '') {
		priceCheck(price);
	}
}
function ratingKeyup() {
	var rating = $('#rating').val();

	if (rating !== '') {
		ratingCheck(rating);
	}
}
function reviewKeyup() {
	var review = $('#review').val();

	if (review !== '') {
		reviewCheck(review);
	}
}