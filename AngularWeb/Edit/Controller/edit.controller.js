﻿var app = angular.module('routeApp');

app.controller('Edit', ['$scope', '$http', '$routeParams', 'movieFactory', 'id', 'close', function ($scope, $http, $routeParams, movieFactory, id, close) {
	movieFactory.getMovie(id)
		.success(function (data) {
			if (data !== null && data !== "") {
				$scope.movie = data;
				$scope.movie.ReleaseDate = moment($scope.movie.ReleaseDate).format("YYYY-MM-DD");
				return;
			}
			alert("값이 Null 또는 Empty 입니다.");
			return history.go();
		})
		.error(function () {
			alert("불러오기 실패");
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

			movieFactory.editMovie(id, moviesData)
				.success(function () {
					alert("수정에 성공했습니다.")
				})
				.error(function (status) {
					alert("실패했습니다.\n조건을 잘 확인해 주시기 바랍니다.\nerror code: " + status)
				})
		}
	};

	$scope.close = function (result) {
		close(result, 500);
	};
}]);