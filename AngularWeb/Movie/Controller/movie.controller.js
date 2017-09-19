var app = angular.module('routeApp');

app.controller('Movie', ['$scope', '$http', 'movieFactory', 'DTOptionsBuilder', function ($scope, $http, movieFactory, DTOptionsBuilder) {
	$scope.dtOptions = DTOptionsBuilder.newOptions()
		.withDisplayLength(10)
		.withOption('bLengthChange', false);

	movieFactory.getMovies()
		.success(function (data) {
			$scope.movies = data;
		})

	movieFactory.getGenres()
		.success(function (data) {
			$scope.genres = data;
		})

	$scope.search = function () {
		var genre = $('#genreList').val();
		var searchTitle = "";
		movieFactory.searchMovie(genre, searchTitle)
			.success(function (data) {
				$scope.movies = data;
			})
	}		
}]);

app.filter('myDate', function ($filter) {
	var releaseDate = /\Date\(([0-9]*)\)\//;
	return function (x) {
		var m = x.match(releaseDate);
		if (m) return new Date(parseInt(m[1]));
		else return null;
	};
});


