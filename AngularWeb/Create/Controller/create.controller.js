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
				.success(function () {
					alert("추가되었습니다.")
				})
				.error(function (status) {
					alert("실패했습니다.\n조건을 잘 확인해 주시기 바랍니다.\nerror code: " + status)
				})
		}
	};
	
}]);