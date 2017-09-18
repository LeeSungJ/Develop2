var app = angular.module('routeApp');

app.controller('Delete', ['$scope', '$http', '$routeParams', 'movieFactory', function ($scope, $http, $routeParams, movieFactory) {
	var id = $routeParams.movieID;

	movieFactory.getMovie(id)
		.success(function (data) {
			$scope.movies = data;
			var releDate = moment($scope.movies.ReleaseDate).format("YYYY-MM-DD");
			$scope.movies.ReleaseDate = releDate;
		})
		.error(function (data) {
			console.log("error");
		})

	$scope.delete = function () {
		movieFactory.deleteMovie(id)
			.success(function (moviesdata, stat) {
				alert("삭제되었습니다.")
			})
			.error(function (moviesdata, status) {
				alert("삭제에 실패했습니다.")
			})
	};
}]);