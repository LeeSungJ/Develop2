var app = angular.module('routeApp');

app.controller('Detail', ['$scope', '$http', '$routeParams', 'movieFactory', function ($scope, $http, $routeParams, movieFactory) {
	var id = $routeParams.movieID;

	movieFactory.getMovie(id)
		.success(function (data) {
			$scope.movies = data;
			$scope.movies.ReleaseDate = moment($scope.movies.ReleaseDate).format("YYYY-MM-DD");
		})
		.error(function (data) {
			alert("불러오기 실패");
		})
}]);