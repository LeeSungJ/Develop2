var app = angular.module('routeApp');

app.controller('Detail', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
	var id = $routeParams.movieID;

	var res = $http({
		url: ('http://localhost/movies/GetMovie/' + id),
		method: 'GET'
	})
		.success(function (data) {
			$scope.movies = data;
			var releDate = moment($scope.movies.ReleaseDate).format("YYYY-MM-DD");
			$scope.movies.ReleaseDate = releDate;
		})
		.error(function (data) {
			console.log("error");
		})
}]);