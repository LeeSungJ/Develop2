var app = angular.module('routeApp');

app.controller('Movie', ['$scope', '$http', 'movieFactory', 'DTOptionsBuilder', 'ModalService', function ($scope, $http, movieFactory, DTOptionsBuilder, ModalService) {
	$scope.dtOptions = DTOptionsBuilder.newOptions()
		.withOption('bLengthChange', true)
		.withOption('bPaginate ', true);

	movieFactory.getMovies()
		.success(function (data) {
			if (data !== null && data !== "") {
				$scope.movies = data;
			} else {
				alert("데이터가 없습니다.")
			}
			
		})
		.error(function (stat, status) {
			alert("로딩 실패\nerror code: " + status + "\nstat: \n");
		})

	movieFactory.getGenreList()
		.success(function (data) {
			if (data !== null && data !== "") {
				$scope.genreList = data;
			} else {
				alert("장르 목록 로딩 실패.");
				return history.go();
			}
		})

	$scope.genreSearch = function () {
		var genre = $('#genreList').val();
		var searchTitle = "";
		if (genre !== null && genre !== "") {
			movieFactory.searchMovie(genre, searchTitle)
				.success(function (data) {
					$scope.movies = data;
				})
				.error(function (stat, status) {
					alert("error code: " + status);
				})
		}
	}

	$scope.priceSearch = function () {
		var startPrice = $('#firstPrice').val();
		var endPrice = $('#endPrice').val();
		if (startPrice && endPrice !== null && startPrice && endPrice !== "") {
			movieFactory.searchPrice(startPrice, endPrice)
				.success(function (data) {
					if (startPrice > endPrice) {
						alert("startPrice가 endPrice보다 클 수 없습니다.");
						return history.go();
					}
					$scope.movies = data;
				})
				.error(function (stat, status) {
					alert("error code:" + status + "\n stat: \n" + stat);
				})
		} else {
			alert("firstPrice 와 endPrice를 정확히 입력해 주세요");
		}
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