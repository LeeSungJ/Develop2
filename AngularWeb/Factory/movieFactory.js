var app = angular.module('routeApp');

app.factory('movieFactory', ['$http', function ($http) {
	var baseUrl = "http://localhost/Movies/";
	var movieFactory = {};

	movieFactory.getMovies = function () {
		return $http.get(baseUrl + "GetMovies");
	}

	movieFactory.getMovie = function (id) {
		return $http.get(baseUrl + "GetMovie/" + id);
	}

	movieFactory.createMovie = function (moviesData) {
		return $http.post(baseUrl + "Post", moviesData);
	}

	movieFactory.editMovie = function (id, moviesData) {
		return $http.post(baseUrl + "Edit/" + id, moviesData);
	}

	movieFactory.deleteMovie = function (id) {
		return $http.get(baseUrl + "Delete/" + id);
	}

	movieFactory.getGenres = function () {
		return $http.get(baseUrl + "GetGenres");
	}

	movieFactory.searchMovie = function (genre, searchTitle) {
		return $http.get(baseUrl + "GetMovies/?movieGenre=" + genre + "&&searchString=" + searchTitle);
	}

	return movieFactory;
}])