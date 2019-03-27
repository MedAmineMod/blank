angular.module('app.side1_app', ['ionic'])
.controller('aboutCtrl', function($scope, $state, $http) {
  // Form data for the login modal
  $scope.loginData = {};
   // Perform the login action when the user submits the login for
  $scope.doLogin = function() {
    //console.log($scope.loginData);
    $http.post("http://samira_food.wcode-agency.com/test_login",($scope.loginData),{headers: {'Content-Type': 'multipart/form-data'}})
      .success(function(data){
        console.log(data);
      });
    };
  $scope.doLogin = function() {
      //console.log($scope.loginData);
  $http.post("http://samira_food.wcode-agency.com/test_login",($scope.loginData),{headers: {'Content-Type': 'multipart/form-data'}})
    .success(function(data){
      console.log(data);
    });
  };
})
