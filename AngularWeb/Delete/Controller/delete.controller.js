﻿var app = angular.module('routeApp');

app.controller('Delete', ['$scope', '$http', '$routeParams', 'movieFactory', 'id', 'close', function ($scope, $http, $routeParams, movieFactory, id, close) {

	movieFactory.getMovie(id)
		.success(function (data) {
			if (data !== null && data !== "") {
				$scope.movies = data;
				$scope.movies.ReleaseDate = moment($scope.movies.ReleaseDate).format("YYYY-MM-DD");
				return;
			}
			alert("값이 Null 또는 Empty 입니다.");
			return history.go();
		})
		.error(function (status) {
			alert("error code: " + status);
		})

	$scope.delete = function () {
		movieFactory.deleteMovie(id)
			.success(function () {
				alert("삭제되었습니다.")
			})
			.error(function (status) {
				alert("삭제에 실패했습니다.\nerror code: " + status)
			})
	};

	$scope.close = function (result) {
		close(result, 500);
	};
}]);