var app = angular.module('routeApp');

app.controller('Movie', ['$scope', '$http', 'movieFactory', 'DTOptionsBuilder', 'ModalService', function ($scope, $http, movieFactory, DTOptionsBuilder, ModalService) {
	$scope.dtOptions = DTOptionsBuilder.newOptions()
		.withOption('bLengthChange', true)
		.withOption('bPaginate ', true);

	movieFactory.getMovies()
		.success(function (data) {
			$scope.movies = data;
		})
		.error(function (status) {
			alert("로딩 실패\nerror code: " + status);
		})
	movieFactory.getGenres()
		.success(function (data) {
			$scope.genres = data;
		})
		.error(function (status) {
			alert("로딩 실패\nerror code: " + status);
		})

	$scope.search = function () {
		var genre = $('#genreList').val();
		var searchTitle = "";
		movieFactory.searchMovie(genre, searchTitle)
			.success(function (data) {
				$scope.movies = data;
			})
	}	

	$scope.edit = function () {
		ModalService.showModal({
			templateUrl: "Edit/View/Edit.html",
			controller: "Edit",
			inputs: {
				id: $(this)[0].m.ID
			},
			preClose: (modal) => { modal.element.modal('hide'); }
		}).then(function (modal) {
			modal.element.modal();
		});
	};

	$scope.detail = function () {
		ModalService.showModal({
			templateUrl: "Detail/View/detail.html",
			controller: "Detail",
			inputs: {
				id: $(this)[0].m.ID
			},
			preClose: (modal) => { modal.element.modal('hide'); }
		}).then(function (modal) {
			modal.element.modal();
		});
	};

	$scope.delete = function () {
		ModalService.showModal({
			templateUrl: "Delete/View/delete.html",
			controller: "Delete",
			inputs: {
				id: $(this)[0].m.ID
			},
			preClose: (modal) => { modal.element.modal('hide'); }
		}).then(function (modal) {
			modal.element.modal();
		});
	};

}]);

app.filter('myDate', function ($filter) {
	var releaseDate = /\Date\(([0-9]*)\)\//;
	return function (x) {
		var m = x.match(releaseDate);
		if (m) return new Date(parseInt(m[1]));
		else return null;
	};
});