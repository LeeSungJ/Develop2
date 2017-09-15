var app = angular.module('routeApp');

app.controller('Movie', ['$scope', '$http', function ($scope, $http) {
	$http({
		method: 'GET',
		url: 'http://localhost/movies/GetMovies'
	})
		.success(function (data) {
			$scope.movies = data;
			var releDate = moment($scope.movies.ReleaseDate).format("YYYY-MM-DD");
			$scope.movies.ReleaseDate = releDate;
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


