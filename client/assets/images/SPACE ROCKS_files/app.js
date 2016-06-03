console.log("hi");

var app = angular.module('SpaceRocks', ['ngRoute']);
viewAsteroids = true;

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'views/templates/view.html',
    controller: 'AsteroidsController'
  })
  .otherwise({
    redirectTo: '/'
  })

}]);


app.controller('AsteroidsController', ['$scope', '$http', function( $scope, $http ) {
  $scope.startDate = '2016-12-25';
  $scope.endDate = '2016-12-31';
  $scope.results;

  // $http.get(apiLinkBase+'feed?start_date=' + $scope.startDate + '&end_date=' + $scope.endDate + '&api_key=' + apiKey).success(function(response) {
  //   console.log(response);
  //   $scope.data = response;
  //   parseAsteroidData($scope.data, parseOrbitData);
  //   // Toggle Asteroid Display to true;
  //   viewAsteroids = true;
  // });

}]);



app.controller('ViewController', ['$scope', '$http', function( $scope, $http ) {
  
  $scope.checkViewStatus = function(){
    return viewAsteroids;
  };

}]);
