var titleFormat = /^[A-Z]{1}[A-Za-z]{2,59}$/;
var dateFormat = /^(20[1-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
var stringFormat = /^[A-Z]{1}[A-Za-z]{2,4}$/;
var genreFormat = /^[A-Z]{1}[A-Za-z]{2,29}$/;
var priceFormat = /^[0-9]{1,2}$/;

function jsonToUrlString(json) {
	var string = '';

	string = Object.keys(json).map(function (key) {
		return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
	}).join('&');

	return string;
};

function validation(data) {
	if (titleCheck(data.Title) === false || dateCheck(data.ReleaseDate) === false || genreCheck(data.Genre) === false || priceCheck(data.Price) === false || ratingCheck(data.Rating) === false || reviewCheck(data.Review) === false) {
		$('#errorField').show();
		return false;
	}
	$('#errorField').hide();
	return true;
};

function titleCheck() {
	var title = $('#title').val();
	if (titleFormat.test(title) === false) {
		$('#checkTitle').text("첫 문자는 대문자, 3 ~ 60자");
		return false;
	} else {
		$('#checkTitle').text("");
		$('#errorField').hide();
	}
}
function dateCheck() {
	var date = $('#releaseDate').val();
	if (dateFormat.test(date) === false) {
		$('#checkReleaseDate').text("날짜를 올바르게 입력해 주세요(ex. 2011-11-11)");
		return false;
	} else {
		$('#checkReleaseDate').text("");
		$('#errorField').hide();
	}
}
function genreCheck(genre) {
	if (genreFormat.test(genre) === false) {
		$('#checkGenre').text("첫 문자는 대문자, 3 ~ 60자");
		return false;
	} else {
		$('#checkGenre').text("");
		$('#errorField').hide();
	}
}
function priceCheck() {
	var price = $('#price').val();
	if (priceFormat.test(price) === false) {
		$('#checkPrice').text("Price는 숫자만 입력 가능.(99까지 가능)");
		return false;
	} else {
		$('#checkPrice').text("");
		$('#errorField').hide();
	}
}
function ratingCheck() {
	var rating = $('#rating').val();
	if (stringFormat.test(rating) === false) {
		$('#checkRating').text("첫 문자는 대문자, 3 ~ 5자");
		return false;
	} else {
		$('#checkRating').text("");
		$('#errorField').hide();
	}
}
function reviewCheck() {
	var review = $('#review').val();
	if (stringFormat.test(review) === false) {
		$('#checkReview').text("첫 문자는 대문자, 3 ~ 5자");
		return false;
	} else {
		$('#checkReview').text("");
		$('#errorField').hide();
	}
}