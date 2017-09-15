var app = angular.module('routeApp')

app.controller('Create', function ($scope, $http) {
	var jsonToUrlString = function (json) {
		var string = '';

		string = Object.keys(json).map(function (key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
		}).join('&');

		return string;
	};

	$scope.postRequest = function (moviesData) {
		var Data = {
			'Title': $scope.movie.Title,
			'ReleaseDate': $scope.movie.ReleaseDate,
			'Genre': $scope.movie.Genre,
			'Price': $scope.movie.Price,
			'Rating': $scope.movie.Rating,
			'Review': $scope.movie.Review
		}

		var result = validation(Data);

		if (result === true) {
			moviesData = jsonToUrlString(Data);

			$http({
				url: 'http://localhost/movies/Post',
				method: 'POST',
				data: moviesData
			})
				.success(function (data, stat) {
					alert("추가되었습니다.")
				})
				.error(function (data, status) {
					alert("실패했습니다.\n 조건을 잘 확인해주시기 바랍니다.")
				})
		}
	};

	$scope.titleKeyup = function () {
		var title = $scope.movie.Title;

		if (title !== '') {
			titleCheck(title);
		}
	}
	$scope.dateKeyup = function () {
		var date = $scope.movie.ReleaseDate;

		if (date !== '') {
			dateCheck(date);
		}
	}
	$scope.genreKeyup = function () {
		var genre = $scope.movie.Genre;

		if (genre !== '') {
			genreCheck(genre);
		}
	}
	$scope.priceKeyup = function () {
		var price = $scope.movie.Price;

		if (price !== '') {
			priceCheck(price);
		}
	}
	$scope.ratingKeyup = function () {
		var rating = $scope.movie.Rating;

		if (rating !== '') {
			ratingCheck(rating);
		}
	}
	$scope.reviewKeyup = function () {
		var review = $scope.movie.Review;

		if (review !== '') {
			reviewCheck(review);
		}
	}
});