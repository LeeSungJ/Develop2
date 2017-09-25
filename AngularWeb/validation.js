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

function titleCheck(value) {
	if (titleFormat.test(value) === false) {
		$('#checkTitle').text("첫 문자는 대문자, 3 ~ 60자");
		return false;
	} else {
		$('#checkTitle').text("");
	}
}
function dateCheck(value) {
	if (dateFormat.test(value) === false) {
		$('#checkReleaseDate').text("날짜를 올바르게 입력해 주세요(ex. 2011-11-11)");
		return false;
	} else {
		$('#checkReleaseDate').text("");
	}
}
function genreCheck(value) {
	if (genreFormat.test(value) === false) {
		$('#checkGenre').text("첫 문자는 대문자, 3 ~ 60자");
		return false;
	} else {
		$('#checkGenre').text("");
	}
}
function priceCheck(value) {
	if (priceFormat.test(value) === false) {
		$('#checkPrice').text("Price는 숫자만 입력 가능.(99까지 가능)");
		return false;
	} else {
		$('#checkPrice').text("");
	}
}
function ratingCheck(value) {
	if (stringFormat.test(value) === false) {
		$('#checkRating').text("첫 문자는 대문자, 3 ~ 5자");
		return false;
	} else {
		$('#checkRating').text("");
	}
}
function reviewCheck(value) {
	if (stringFormat.test(value) === false) {
		$('#checkReview').text("첫 문자는 대문자, 3 ~ 5자");
		return false;
	} else {
		$('#checkReview').text("");
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