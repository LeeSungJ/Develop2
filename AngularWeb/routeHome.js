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
        if (format.test($scope.releaseDate) === false) {
            alert("올바르게 입력해 주세요(ex. 2011-11-11)")
        } else {
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
                    console.log(data)
                })
                .error(function (data, status) {
                    $scope.status;
                })
        }
    };

    
}]);

app.controller('Edit', ['$scope', '$http', '$routeParams', '$filter', function ($scope, $http, $routeParams) {

    var id = $routeParams.movieID;

    var res = $http({
        url: ('http://localhost/movies/GetMovie/' + id),
        method: 'GET'
    })
        .success(function (data) {
            $scope.movies = data;
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
                console.log(data)
            })
            .error(function (data, status) {
                $scope.status;
            })
    };

}]);

app.controller('Detail', ['$scope', '$http', '$routeParams', '$filter', function ($scope, $http, $routeParams) {
    var id = $routeParams.movieID;

    var res = $http({
        url: ('http://localhost/movies/GetMovie/' + id),
        method: 'GET'
    })
        .success(function (data) {
            $scope.movies = data;
        })
        .error(function (data) {
            console.log("error");
        })

    $scope.back = function () {

    }
}]);

app.controller('Delete', ['$scope', '$http', '$routeParams', '$filter', function ($scope, $http, $routeParams) {
    var id = $routeParams.movieID;

    var res = $http({
        url: ('http://localhost/movies/GetMovie/' + id),
        method: 'GET'
    })
        .success(function (data) {
            $scope.movies = data;
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
            url: 'http://localhost/movies/Delete/' + id,
            method: 'DELETE',
            data: moviesData
        })
            .success(function (data, stat) {
                console.log(data)
            })
            .error(function (data, status) {
                $scope.status;
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

