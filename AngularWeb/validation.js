var app = angular.module('routeApp');

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

	if (titleFormat.test(data.Title) === false) {
		alert("첫 문자는 대문자, 글자 수 유의.(ex.Title, 3~60자)");
		return false;
	}
	if (dateFormat.test(data.ReleaseDate) === false) {
		alert("날짜를 올바르게 입력해 주세요(ex. 2011-11-11)");
		return false;
	}
	if (genreFormat.test(data.Genre) === false) {
		alert("첫 문자는 대문자, 글자 수 유의.(ex.Action, 3~30자)");
		return false;
	}
	if (priceFormat.test(data.Price) === false) {
		alert("Price는 숫자만 입력 가능.(99까지 가능)");
		return false;
	}
	if (stringFormat.test(data.Rating) === false) {
		alert("첫 문자는 대문자, 글자 수 유의.(ex.Five, 3~5자)");
		return false;
	}
	if (stringFormat.test(data.Review) === false) {
		alert("첫 문자는 대문자, 글자 수 유의.(ex.Good, 3~5자)");
		return false;
	}
	return true
};

function titleCheck(value) {
	var title = value;
	if (titleFormat.test(title) === false) {
		$('#checkTitle').text("첫 문자는 대문자, 3 ~ 60자");
	} else {
		$('#checkTitle').text("");
	}
}

function dateCheck(value) {
	var date = value;
	if (dateFormat.test(date) === false) {
		$('#checkReleaseDate').text("날짜를 올바르게 입력해 주세요(ex. 2011-11-11)");
	} else {
		$('#checkReleaseDate').text("");
	}
}

function genreCheck(value) {
	var genre = value;
	if (genreFormat.test(genre) === false) {
		$('#checkGenre').text("첫 문자는 대문자, 3 ~ 60자");
	} else {
		$('#checkGenre').text("");
	}
}

function priceCheck(value) {
	var price = value;
	if (priceFormat.test(price) === false) {
		$('#checkPrice').text("Price는 숫자만 입력 가능.(99까지 가능)");
	} else {
		$('#checkPrice').text("");
	}
}

function ratingCheck(value) {
	var rating = value;
	if (stringFormat.test(rating) === false) {
		$('#checkRating').text("첫 문자는 대문자, 3 ~ 5자");
	} else {
		$('#checkRating').text("");
	}
}

function reviewCheck(value) {
	var review = value;
	if (stringFormat.test(review) === false) {
		$('#checkReview').text("첫 문자는 대문자, 3 ~ 5자");
	} else {
		$('#checkReview').text("");
	}
}