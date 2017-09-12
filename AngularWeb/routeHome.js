var app = angular.module('routeApp', ['ngRoute']);

app.config(['$routeProvider','$httpProvider' , function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $routeProvider
        .when('/movieList', { templateUrl: 'movie.html', controller: 'Movie' })
        .when('/create', { templateUrl: 'views/Create.html', controller: 'Create' })
        .when('/edit/:movieID', { templateUrl: 'views/Edit.html', controller: 'Edit' })
        .when('/detail/:movieID', { templateUrl: 'views/Detail.html', controller: 'Detail' })
        .when('/delete/:movieID', { templateUrl: 'views/Delete.html', controller: 'Delete' })
}]);

app.controller('Movie', ['$scope', '$http', '$filter', function ($scope, $http) {
    $http({
        method: 'GET',
        url: 'http://localhost/movies/GetMovies'
    })
        .success(function (data) {
            $scope.movies = data;
            var releDate = moment($scope.movies.ReleaseDate).format("YYYY-MM-DD");
            $scope.movies.ReleaseDate = releDate;
        })
}]);

app.controller('Create', ['$scope', '$http', function ($scope, $http) {
    var jsonToUrlString = function (json) {
        var string = '';

        string = Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
        }).join('&');

        return string;
    };

    $scope.postRequest = function (moviesData) {

        var format = /^(20[1-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        var strFormat = /^[A-Z]{1}[A-Za-z]{1,4}$/;
        var gFormat = /^[A-Z]{1}[A-Za-z]{1,29}$/;
        var pFormat = /^[0-9]{1,2}$/;
        if (strFormat.test($scope.title) === false) {
            alert("첫 문자는 대문자로 시작해야 합니다.(ex.Title, 1~5자)");
            return false;
        }
        if (format.test($scope.releaseDate) === false) {
            alert("날짜를 올바르게 입력해 주세요(ex. 2011-11-11)");
            return false;
        }
        if (gFormat.test($scope.genre) === false) {
            alert("첫 문자는 대문자로 시작해야 합니다.(ex.Action, 1~30자)");
            return false;
        }
        if (pFormat.test($scope.price) === false) {
            alert("Price는 숫자만 입력 가능 합니다.(99까지 가능)");
            return false;
        }
        if (strFormat.test($scope.rating) === false) {
            alert("첫 문자는 대문자로 시작해야 합니다.(ex.Rate, 1~5자)");
            return false;
        }
        if (strFormat.test($scope.review) === false) {
            alert("첫 문자는 대문자로 시작해야 합니다.(ex.Good, 1~5자)");
            return false;
        }
        else {
            var Data = {
                'Title': $scope.title,
                'ReleaseDate': $scope.releaseDate,
                'Genre': $scope.genre,
                'Price': $scope.price,
                'Rating': $scope.rating,
                'Review': $scope.review
            }
            moviesData = jsonToUrlString(Data);

            $http({
                url: 'http://localhost/movies/Post',
                method: 'POST',
                data: moviesData
            })
                .success(function (data, stat) {
                    alert("추가되었습니다.")
                })
                .error(function (data, status) {
                    alert("실패했습니다.\n 각 항목의 처음은 대문자로, Price는 숫자로 입력해주시기 바랍니다.")
                })
        }
    };
}]);

app.controller('Edit', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    var id = $routeParams.movieID;

    var res = $http({
        url: ('http://localhost/movies/GetMovie/' + id),
        method: 'GET'
    })
        .success(function (data) {
            $scope.movies = data;
            var str = moment($scope.movies.ReleaseDate).format("YYYY-MM-DD");
            $scope.movies.ReleaseDate = str;
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

    $scope.edit = function () {
        var format = /^(20[1-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        var strFormat = /^[A-Z]{1}[A-Za-z]{1,4}$/;
        var gFormat = /^[A-Z]{1}[A-Za-z]{1,29}$/;
        var pFormat = /^[0-9]{1,2}$/;
        if (strFormat.test($scope.movies.Title) === false) {
            alert("첫 문자는 대문자로 시작해야 합니다.(ex.Title, 1~5자)");
            return false;
        }
        if (format.test($scope.movies.ReleaseDate) === false) {
            alert("날짜를 올바르게 입력해 주세요(ex. 2011-11-11)");
            return false;
        }
        if (gFormat.test($scope.movies.Genre) === false) {
            alert("첫 문자는 대문자로 시작해야 합니다.(ex.Action, 1~30자)");
            return false;
        }
        if (pFormat.test($scope.movies.Price) === false) {
            alert("Price는 숫자만 입력 가능 합니다.(99까지 가능)");
            return false;
        }
        if (strFormat.test($scope.movies.Rating) === false) {
            alert("첫 문자는 대문자로 시작해야 합니다.(ex.Five, 1~5자)");
            return false;
        }
        if (strFormat.test($scope.movies.Review) === false) {
            alert("첫 문자는 대문자로 시작해야 합니다.(ex.Good, 1~5자)");
            return false;
        }
        else {
                var Data = {
                    'Title': $scope.movies.Title,
                    'ReleaseDate': $scope.movies.ReleaseDate,
                    'Genre': $scope.movies.Genre,
                    'Price': $scope.movies.Price,
                    'Rating': $scope.movies.Rating,
                    'Review': $scope.movies.Review
                }

                moviesData = jsonToUrlString(Data);

                $http({
                    url: 'http://localhost/movies/Edit/' + id,
                    method: 'POST',
                    data: moviesData
                })
                    .success(function (data, stat) {
                        alert("수정에 성공했습니다.")
                    })
                    .error(function (data, status) {
                        $scope.status;
                    })
                }
        };
}]);

app.controller('Detail', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
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

    $scope.back = function () {

    }
}]);

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
                $scope.status;
                alert("삭제에 실패했습니다.")
            })
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
