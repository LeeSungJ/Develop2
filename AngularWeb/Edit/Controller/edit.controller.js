﻿var app = angular.module('routeApp');

app.controller('Edit', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
	var id = $routeParams.movieID;

	var res = $http({
		url: ('http://localhost/movies/GetMovie/' + id),
		method: 'GET'
	})
		.success(function (data) {
			$scope.movie = data;
			$scope.movie.ReleaseDate = moment($scope.movie.ReleaseDate).format("YYYY-MM-DD");
		})
		.error(function (data) {
			console.log("error");
		})

	$scope.edit = function () {
		var Data =
			{
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

			$http
				({
					url: 'http://localhost/movies/Edit/' + id,
					method: 'POST',
					data: moviesData
				})
				.success(function (data) {
					alert("수정에 성공했습니다.")
				})
				.error(function (data) {
					alert("수정에 실패했습니다.\n 조건을 잘 확인해 주세요")
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

}]);
