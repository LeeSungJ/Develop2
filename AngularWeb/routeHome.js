var app = angular.module('routeApp', ['ngRoute']);

app.config(['$routeProvider','$httpProvider' , function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $routeProvider
        .when('/movieList', { templateUrl: 'movie.html', controller: 'Movie' })
        .when('/create', { templateUrl: 'views/Create.html', controller: 'Create' })
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