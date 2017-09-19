var app = angular.module('routeApp', ['ngRoute', 'datatables']);
app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

	$routeProvider
		.when('/movieList', { templateUrl: 'Movie/View/movie.html', controller: 'Movie' })
		.when('/create', { templateUrl: 'Create/View/Create.html', controller: 'Create' })
		.when('/edit/:movieID', { templateUrl: 'Edit/View/Edit.html', controller: 'Edit' })
		.when('/detail/:movieID', { templateUrl: 'Detail/View/Detail.html', controller: 'Detail' })
		.when('/delete/:movieID', { templateUrl: 'Delete/View/Delete.html', controller: 'Delete' })
}]);