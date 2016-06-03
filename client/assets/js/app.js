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
  $scope.startDate = '2016-06-01';
  $scope.endDate = '2016-06-08';
  $scope.results;
  // $scope.prevLink;
  // $scope.link = apiLinkBase+'feed?start_date=' + $scope.startDate + '&end_date=' + $scope.endDate + '&api_key=' + apiKey;
  // $scope.count = 0;
  // // for(var i = 0; i < 4; i++){
  //   console.log("GETTING DATA FOR YOU!");
  //   var getAsteroids = setInterval(function(){
  //     console.log($scope.count);
  //     if ($scope.count == 22){
  //       clearInterval(getAsteroids);
  //     } else {
  //       $http.get($scope.link).success(function(response) {
  //       $scope.data = response;
  //       $scope.link = response.links.prev;
  //       console.log(34,$scope.link);
  //       parseAsteroidData($scope.data, parseOrbitData);
  //       $scope.count++;
  //       });
  //     }
  //   },3000);
    
  // }

}]);



app.controller('ViewController', ['$scope', '$http', function( $scope, $http ) {
  
  $scope.checkViewStatus = function(){
    return viewAsteroids;
  };

}]);
