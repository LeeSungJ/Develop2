var app = angular.module('routeApp');

app.controller('Detail', ['$scope', '$http', '$routeParams', 'movieFactory', 'id', 'close', function ($scope, $http, $routeParams, movieFactory, id, close) {
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
		.error(function (stat, status) {
			alert("불러오기 실패\nerror code: " + status);
		})

	$scope.imageShow = true;

	$scope.close = function (result) {
		close(result, 500);
	};
}]);