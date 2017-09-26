var app = angular.module('routeApp');

app.controller('Delete', ['$scope', '$http', '$routeParams', 'movieFactory', 'id', 'close', function ($scope, $http, $routeParams, movieFactory, id, close) {
	if (id === null) {
		alert("ID를 받아오지 못했습니다.")
		return history.go();
	}
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
			alert("error code: " + status + "\nstat:\n" + stat);
			return history.go();
		})

	$scope.delete = function () {
		movieFactory.deleteMovie(id)
			.success(function () {
				alert("삭제되었습니다.")
			})
			.error(function (stat, status) {
				alert("삭제에 실패했습니다.\nerror code: " + status)
			})
	};

	$scope.close = function (result) {
		close(result, 500);
	};
}]);