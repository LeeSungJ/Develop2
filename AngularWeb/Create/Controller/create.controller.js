var app = angular.module('routeApp')

app.controller('Create', ['$scope', '$http', 'movieFactory', function ($scope, $http, movieFactory) {

	$scope.postRequest = function (moviesData) {
		var Data = {
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

			movieFactory.createMovie(moviesData)
				.success(function (data, stat) {
					alert("추가되었습니다.")
				})
				.error(function (data, status) {
					alert("실패했습니다.\n 조건을 잘 확인해주시기 바랍니다.")
				})
		}
	};
	
}]);