angular.module('starter', ['ionic','app.side2_app'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

var islogged;
var admobid = {};

// TODO: replace the following ad units with your own
if( /(android)/i.test(navigator.userAgent) ) {
  admobid = { // for Android
    banner: 'AD_UNIT_ID_BANNER',
    interstitial: 'AD_UNIT_ID_INTERSTICIAL'
  };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
  admobid = { // for iOS
    banner: 'AD_UNIT_ID_BANNER',
    interstitial: 'AD_UNIT_ID_INTERSTICIAL'
  };
}

function initApp() {

  // if (! AdMob ) { alert( 'admob plugin not ready' ); return; }
  // // this will create a banner on startup
  // AdMob.createBanner( {
  //   adId: admobid.banner,
  //   position: AdMob.AD_POSITION.BOTTOM_CENTER,
  //   isTesting: false, // TODO: remove this line when release
  //   overlap: false,
  //   offsetTopBar: false,
  //   bgColor: 'purple'
  // } );
  //
  // // this will load a full screen ad on startup
  // AdMob.prepareInterstitial({
  //   adId: admobid.interstitial,
  //   isTesting: false, // TODO: remove this line when release
  //   autoShow: true
  // });

}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

});

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

$ionicConfigProvider.tabs.position("top");
$ionicConfigProvider.navBar.alignTitle("center");

// console.log($stateProvider.state);
$stateProvider

      // .state('tab-bottom', {
      //  url: '/tab-bottom',
      //  abstract: true,
      //  templateUrl: 'tab-bottom.html'
      // })
      .state('tab.videos', {
        url: '/videos',
        views: {
          'tab-videos': {
            templateUrl: 'videos.html',
            controller: 'VideosCtrl'
          }
        }
      })
      .state('tab.video', {
        url: '/video/:video',
        views: {
          'tab-video': {
            templateUrl: 'video.html',
            controller: 'VideoCtrl'
          }
        }
      })
      //Videos and and video State  router and sriwriwrate

     .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'tab.html'
    })

     .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'home.html',
            controller: 'RecetasCtrl'
          }
        }
      })

     .state('tab.about', {
        url: '/about',
        views: {
          'tab-about': {
            templateUrl: 'about.html',
            controller: 'aboutCtrl'
          }
        }
      })

      .state('tab.details', {
        url: '/details/:id',
        views: {
          'tab-details': {
            templateUrl: 'details.html',
            controller: 'DetailsCtrl'
          }
        }
      })

    .state('tab.search', {
        url: '/search',
        views: {
          'tab-search': {
            templateUrl: 'search.html',
            controller: 'SearchCtrl'
          }
        }
      })
//Categorie and categories router and sriwriwrate
    .state('tab.categories', {
        url: '/categories',
        views: {
          'tab-categories': {
            templateUrl: 'categories.html',
            controller: 'CategoriesCtrl'
          }
        }
      })

.state('tab.category', {
        url: '/category/:category',
        views: {
          'tab-category': {
            templateUrl: 'category.html',
            controller: 'CategoryCtrl'
          }
        }
      })
//Categorie and categories router and sriwriwrate
//Videos and and video State  router and sriwriwrate



    .state('tab.chefs', {
        url: '/listchefs',
        views: {
          'tab-chefs': {
            templateUrl: 'chefs.html',
            controller: 'ChefsCtrl'
          }
        }
      })

    .state('tab.profile', {
        url: '/profile/:chef',
        views: {
          'tab-profile': {
            templateUrl: 'profile.html',
            controller: 'ChefCtrl'
          }
        }
      })

    .state('tab.chef', {
        url: '/chef/:chef',
        views: {
          'tab-chef': {
            templateUrl: 'chef.html',
            controller: 'ChefCtrl'
          }
        }
      })

$urlRouterProvider.otherwise('/tab/home');})

.filter('unique', function() {

   return function(collection, keyname) {
      var output = [],
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
})


.controller('RecetasCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $http.get('http://samira_food.wcode-agency.com/json_recipes.json')
  .success(function(data){
    $scope.recipes = data.recipes;
    $scope.data = data.recipes[$state.params.id];
  });

}])

//Category-recipes and categories Controllers :
.controller('CategoriesCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('http://samira_food.wcode-agency.com/json_recipes.json')
  .success(function(data){
    $scope.recipes = data.recipes;
  });

}])

.controller('CategoryCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
 $scope.params = $state.params ;
  $http.get('http://samira_food.wcode-agency.com/json_recipes.json')
  .success(function(data){
    $scope.recipes = data.recipes;
    //$scope.data = data.recipes[$state.category];

    });

  $http.get('http://samira_food.wcode-agency.com/json_categories.json')
  .success(function(data){
    $scope.data = data.categories[$state.params.id];
    $scope.categories = data.categories;
  });
}])
//END OF Category and categories Controllers :
//***************************************************************************************
//Videos-recipes  and videos Controllers :
.controller('VideosCtrl' ,['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('http://api.wcode-agency.com/videos.json')
  .success(function(data){
    $scope.videos = data.videos;
    console.log(data.videos);
  });
}] )
.controller('VideoCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
 $scope.params = $state.params ;
  $http.get('http://samira_food.wcode-agency.com/json_recipes.json')
  .success(function(data){
    $scope.recipes = data.recipes;
    //$scope.data = data.recipes[$state.category];
    });

  $http.get('http://api.wcode-agency.com/videos.json')
  .success(function(data){
    $scope.data = data.categories[$state.params.id];
    $scope.categories = data.categories;
  });
}])
//***************************************************************************************


.controller('ChefsCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('http://samira_food.wcode-agency.com/json_recipes.json')
  .success(function(data){
    $scope.recipes = data.recipes;
  });

}])

.controller('ChefCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $scope.params = $state.params ;
  $http.get('http://samira_food.wcode-agency.com/json_recipes.json')
  .success(function(data){
    $scope.recipes = data.recipes;
    //$scope.data = data.recipes[$state.chef];

    });

    $http.get('http://samira_food.wcode-agency.com/json_chefs.json')
  .success(function(data){
    $scope.data = data.chefs[$state.params.id];
    $scope.chefs = data.chefs;
  });

}])

.controller('DetailsCtrl', ['$scope', '$http', '$state' ,  '$sce', function($scope, $http, $state , $sce) {
  $http.get('http://samira_food.wcode-agency.com/json_recipes.json')
  .success(function(data){

    for (var i = 0; i < data.recipes.length; i++) {
    console.log(  data.recipes[i].id);

    if ($state.params.id == data.recipes[i].id ) {
        $scope.data = data.recipes[i];
        $scope.trustSrc = function(src) {

       return $sce.trustAsResourceUrl(src);
        }
        $scope.movie = {src:""+ data.recipes[i].video_link +"", title:"Egghead.io AngularJS Binding"};
    }
    }
    // console.log(data.recipes);
    $scope.recipes = data.recipes;
    //video in detailsComponent
  });

  $http.get('http://samira_food.wcode-agency.com/json_chefs.json')
  .success(function(data){
    $scope.chefs = data.chefs;
  });

  }])

  .controller('SearchCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('http://samira_food.wcode-agency.com/json_recipes.json')
  .success(function(data){
    $scope.data = data.recipes[$state.params.id];
    $scope.recipes = data.recipes;
  });

  $http.get('http://samira_food.wcode-agency.com/json_chefs.json')
  .success(function(data){
    $scope.chefs = data.chefs;
  });
 // helloooooooooo
 // branch
}])
