var app = angular.module('routeApp');

app.controller('Movie', ['$scope', '$http', 'movieFactory', function ($scope, $http, movieFactory) {
	movieFactory.getMovies()
		.success(function (data) {
			$scope.movies = data;
		})
}]);

app.filter('myDate', function ($filter) {
	var releaseDate = /\Date\(([0-9]*)\)\//;
	return function (x) {
		var m = x.match(releaseDate);
		if (m) return new Date(parseInt(m[1]));
		else return null;
	};

});


