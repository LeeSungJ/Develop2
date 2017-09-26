var app = angular.module('routeApp');

app.controller('Edit', ['$scope', '$http', '$routeParams', 'movieFactory', 'id', 'close', function ($scope, $http, $routeParams, movieFactory, id, close) {
	if (id === null) {
		alert("ID가 Null 입니다.")
		return history.go();
	}
	movieFactory.getMovie(id)
		.success(function (data) {
			if (data !== null && data !== "") {
				$scope.movie = data;
				$scope.movie.ReleaseDate = moment($scope.movie.ReleaseDate).format("YYYY-MM-DD");
				$scope.ID = id;
				return;
			}
			alert("값이 Null 또는 Empty 입니다.");
			return history.go();
		})
		.error(function () {
			alert("불러오기 실패");
			return history.go();
		})

	movieFactory.getGenreList()
		.success(function (data) {
			if (data !== null && data !== "") {
				$scope.genreList = data;
				return;
			} else {
				$scope.genreList = {'result' : '장르목록이 없습니다.'};
			}
		})
		.error(function () {
			alert("장르 목록 불러오기 실패")
		})

	$scope.edit = function () {
		var Data =
			{
				'Title': $scope.movie.Title,
				'ReleaseDate': $scope.movie.ReleaseDate,
				'Genre': $scope.movie.Genre,
				'Price': $scope.movie.Price,
				'Rating': $scope.movie.Rating,
				'Review': $scope.movie.Review
			}

		var result = validation(Data);

		if (result === true) {
			moviesData = jsonToUrlString(Data);
			movieFactory.editMovie(id, moviesData)
				.success(function () {
					alert("수정에 성공했습니다.")
				})
				.error(function (stat, status) {
					alert("실패했습니다.\n조건을 잘 확인해 주시기 바랍니다.\nerror code: " + status)
				})
		}
	};

	$scope.close = function (result) {
		close(result, 500);
	};
}]);