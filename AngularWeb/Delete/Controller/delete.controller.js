var app = angular.module('routeApp');

app.controller('Delete', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
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

	var jsonToUrlString = function (json) {
		var string = '';

		string = Object.keys(json).map(function (key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
		}).join('&');

		return string;
	};

	$scope.delete = function () {
		$http({
			url: 'http://localhost/movies/Delete/' + id,
			method: 'GET'
		})
			.success(function (moviesdata, stat) {
				alert("삭제되었습니다.")
			})
			.error(function (moviesdata, status) {
				alert("삭제에 실패했습니다.")
			})
	};
}]);