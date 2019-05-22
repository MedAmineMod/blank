angular.module('app.side1_app', ['ionic'])
.controller('aboutCtrl', function($scope, $state, $http, myService) {
// Form data for the login modal
//  console.log(islogged);
  $scope.loginData = {};
  $scope.registerData = {};
  $scope.showloginlink=true;
  $scope.showRloginlink=true;
   // Perform the login action when the user submits the login for
  $scope.doRegister = function() {
    //console.log($scope.loginData);
    $http.post("http://samiratv.wcode-agency.com/test_login",($scope.registerData),{headers: {'Content-Type': 'multipart/form-data'}})
      .success(function(data){
        console.log(data);
      });
      $scope.showloginlink=true;
      $scope.showRloginlink=false;
      $scope.showlogout=false;
      $state.go('tab.home');
    };

  $scope.doLogout = function() {
      //console.log($scope.loginData);

      $scope.showloginlink=true;
      $scope.showRloginlink=true;
      $scope.showlogout=false;
  };


  $scope.doLogin = function() {
      //console.log($scope.loginData);
  $http.post("http://samiratv.wcode-agency.com/test_login",($scope.loginData),{headers: {'Content-Type': 'multipart/form-data'}})
    .success(function(data){
      console.log(data);
      if (data.result == 'loggedin') {
        window.localStorage.setItem('usertoken',data.result);
        $scope.showloginlink=false;
        $scope.showRloginlink=false;
        $scope.showlogout=true;
        $scope.user = data.user;
        $scope.$broadcast('user_data',data.user);
        console.log($scope.user);
        $state.go('tab.home');
        myService.setJson($scope.user);
      }else{
        alert('wrong email or password');
      }
    });
  };
})


.controller('DetailsCtrl2', function($scope, $state, $http) {
  // Form data for the login modal
  $scope.loginData = {};
   // Perform the login action when the user submits the login for
  $scope.saveR = function(user,recipe) {
    //console.log($scope.loginData);
    $http.post("http://samiratv.wcode-agency.com/test_post",($scope.loginData),{headers: {'Content-Type': 'multipart/form-data'}})
      .success(function(data){
        console.log(data);
      });
    };
})
