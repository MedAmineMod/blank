angular.module('starter', ['ionic','app.side2_app','app.side1_app'])

.filter("FilterbyAll", function(){

  return function(users, postDate){

       var addUser;
       var selectedUsers = [];
       console.log(postDate);
       if (postDate == 0) {
         postDate = 2000;
       }
       for(i=0;i<users.length;i++){
           addUser = false;
           if (parseInt(users[i].totalminutes) <= postDate){
             console.log(users[i].totalminutes);
                addUser = true;
               if (addUser){
                   selectedUsers.push(users[i]);
               }

           }

   }
       return selectedUsers;
   };

})

/*
.filter("video_linkFilter", function(){

  return function(recipes){

       var addUser;
       var selectedUsers = [];

       for(i=0;i<recipes.length;i++){
           addUser = false;
           if (recipes[i].video_link.length){
             console.log(users[i].totalminutes);
                addUser = true;
               if (addUser){
                   selectedUsers.push(users[i]);
               }

           }

   }
       return selectedUsers;
   };

})
*/
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
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712'
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

.factory('myService', function(){
  var userinfos = null;//the object to hold our data
   return {
   getJson:function(){
     return userinfos;
   },
   setJson:function(value){
    userinfos = value;
   }
   }
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
.controller('VideosCtrl' ,['$scope', '$http', '$state','$sce' ,function($scope, $http, $state ,$sce) {
  $http.get('http://samira_food.wcode-agency.com/json_Vrecipes.json')
  .success(function(data){
    $scope.movie  ;
    $scope.recipes = data.recipes ;
    // for (var i = 0; i < $scope.recipes.length; i++) {
        $scope.trustSrc = function(src) {

            return $sce.trustAsResourceUrl(src);

        }
        // $scope.movie[i]   = {src:""+ data.recipes[i].normal_video_link +"", title:"tata"};
    // }

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
/*
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

*/
  .controller('DetailsCtrl', ['$scope', '$http', '$state', 'myService', function($scope, $http, $state, myService) {
  $http.get('http://samira_food.wcode-agency.com/json_recipes.json')
  .success(function(data){
    $scope.myuserinfos = myService.getJson();
    for (var i = 0; i < data.recipes.length; i++) {
    console.log(  data.recipes[i].id);
    if ($state.params.id == data.recipes[i].id ) {
        $scope.data = data.recipes[i];
        $http.post("http://samira_food.wcode-agency.com/test_post",(['getsaverecipe',$scope.myuserinfos,$state.params.id]),{headers: {'Content-Type': 'multipart/form-data'}})
          .success(function(data){
            console.log(data);
            $scope.saveclr = data.clr;
            $scope.favclr = data.favclr;
            $scope.starsrecipe = data.starsrecipe;
            $scope.disbtn = data.disable;
        });

    }
  }
    console.log(data.recipes);
    $scope.recipes = data.recipes;
  });

  $http.get('http://samira_food.wcode-agency.com/json_chefs.json')
  .success(function(data){
    $scope.chefs = data.chefs;
  });

  $scope.saveR = function(recipe) {
    //console.log($scope.loginData);
    //console.log(recipe);
    $http.post("http://samira_food.wcode-agency.com/test_post",(['saverecipe',$scope.myuserinfos,recipe]),{headers: {'Content-Type': 'multipart/form-data'}})
      .success(function(data){
        console.log(data);
    });
  };

  $scope.favR = function(recipe) {
      //console.log($scope.loginData);
      //console.log(recipe);
      $http.post("http://samira_food.wcode-agency.com/test_post",(['favrecipe',$scope.myuserinfos,recipe]),{headers: {'Content-Type': 'multipart/form-data'}})
        .success(function(data){
          console.log(data);
      });
    };
  }])

  .controller('SearchCtrl', ['$scope', '$http' , '$state', function($scope, $http, $state) {
  $http.get('http://samira_food.wcode-agency.com/json_recipes.json')
  .success(function(data){
    $scope.data = data.recipes[$state.params.id];
    $scope.recipes = data.recipes;
  });

  $http.get('http://samira_food.wcode-agency.com/json_chefs.json')
  .success(function(data){
    $scope.chefs = data.chefs;
  });


  // FILTER BY

    $scope.groups = [];
    $scope.btnVal = "" ;
    $scope.serveTime  =  "" ;
    $scope.cato = "" ;
    var btns  = document.getElementsByClassName("btn-diff");
    // console.log(btns);

    $scope.orderByMe = function(x) {
        if (x == "EASY" || x =="HARD" || x == "MASTER" || x == '') {
          $scope.btnVal = x ;
          console.log($scope.btnVal);
        };
        if (x == 60 || x ==  15  || x == 30) {
          $scope.serveTime = x ;
          console.log($scope.serveTime);
        };
  if (x == 17 || x ==  18  || x == 19) {
            $scope.cato = x ;
          console.log($scope.cato);
        };
    };

    $scope.replaceOther = function (index) {

        if (index == 0) {
            btns[1].classList.add(  'button-outline') ;
            btns[2].classList.add(  'button-outline') ;
            btns[3].classList.add( 'button-outline') ;

        }else if(index == 1) {
              btns[0].classList.add( 'button-outline') ;
              btns[2].classList.add( 'button-outline') ;
              btns[3].classList.add( 'button-outline') ;

        }else if (index == 2) {
              btns[0].classList.add( 'button-outline') ;
              btns[1].classList.add( 'button-outline') ;
              btns[3].classList.add( 'button-outline') ;

        }else if (index == 3) {
              btns[0].classList.add( 'button-outline') ;
              btns[1].classList.add( 'button-outline') ;
              btns[2].classList.add( 'button-outline') ;
        }
    };
    $scope.replaceOtherTime = function (index) {

        if (index == 4) {
            btns[5].classList.add(  'button-outline') ;
            btns[6].classList.add(  'button-outline') ;
            btns[7].classList.add( 'button-outline') ;

        }else if(index == 5) {
              btns[6].classList.add( 'button-outline') ;
              btns[4].classList.add( 'button-outline') ;
              btns[7].classList.add( 'button-outline') ;

        }else if (index == 6) {
              btns[4].classList.add( 'button-outline') ;
              btns[5].classList.add( 'button-outline') ;
              btns[7].classList.add( 'button-outline') ;
        }else  if (index == 7) {
              btns[4].classList.add(  'button-outline') ;
              btns[5].classList.add(  'button-outline') ;
              btns[6].classList.add(  'button-outline') ;
          }
  //categories filter >>>
        if (index == 8) {
            btns[9].classList.add(  'button-outline') ;
            btns[10].classList.add(  'button-outline') ;
        }else if(index ==9) {
              btns[8].classList.add( 'button-outline') ;
              btns[10].classList.add( 'button-outline') ;
        }else if (index ==10) {
              btns[8].classList.add( 'button-outline') ;
              btns[9].classList.add( 'button-outline') ;
        }
    };

    $scope.makeActive = function( ) {
      if (btns[0].classList.contains('button-outline')) {
            btns[0].classList.remove('button-outline') ;
              $scope.replaceOther (0) ;
          }

    };
    $scope.makeActiveHard = function() {
      if (btns[1].classList.contains('button-outline')) {
          btns[1].classList.remove('button-outline') ;
        }
        $scope.replaceOther (1) ;
        };

    $scope.makeActiveMaster = function() {
      if (btns[2].classList.contains('button-outline')) {
          btns[2].classList.remove('button-outline') ;
    }
         $scope.replaceOther (2) ; };
    $scope.makeActiveNone = function() {
      if (btns[3].classList.contains('button-outline')) {
          btns[3].classList.remove('button-outline') ;
    }
         $scope.replaceOther (3) ; };


    $scope.makeActiveTimeOne  = function() {
      if (btns[4].classList.contains('button-outline')) {
          btns[4].classList.remove('button-outline') ;
            $scope.replaceOtherTime(4) ;
      }
    };
    $scope.makeActiveTimeTow  = function() {
      if (btns[5].classList.contains('button-outline')) {
          btns[5].classList.remove('button-outline') ;
            $scope.replaceOtherTime(5) ;
      }
    };
    $scope.makeActiveTimeThree  = function() {
      if (btns[6].classList.contains('button-outline')) {
          btns[6].classList.remove('button-outline') ;
            $scope.replaceOtherTime(6) ;
      }
    };
    $scope.makeActiveTimeThreePlus  = function() {
      if (btns[7].classList.contains('button-outline')) {
          btns[7].classList.remove('button-outline') ;
            $scope.replaceOtherTime(7) ;
      }
    };

    $scope.makeActiveCatOne  = function() {
      if (btns[8].classList.contains('button-outline')) {
          btns[8].classList.remove('button-outline') ;
            $scope.replaceOtherTime(8) ;
      }
    };
    $scope.makeActiveCatTow  = function() {
      if (btns[9].classList.contains('button-outline')) {
          btns[9].classList.remove('button-outline') ;
            $scope.replaceOtherTime(9) ;
      }
    };
    $scope.makeActiveCatThree  = function() {
      if (btns[10].classList.contains('button-outline')) {
          btns[10].classList.remove('button-outline') ;
            $scope.replaceOtherTime(10) ;
      }
    };




    for (var i=0; i<1; i++) {
      $scope.groups[i] = {
        name: "",
        items: [],
        show: false
      };

      for (var j=0; j<1; j++) {
         $scope.groups[i].items.push(i + '-' + j);
       }

  };



  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };



 // branch
}])
// .filter('filterByTime' ,  function () {
//   return function (times ,val) {
//   var filtered = [];
//   for (var i = 0; i < times.length; i++) {
//   var item = times[i];
//   if (item.totalminutes  < val  ) {
//     filtered.push(item);
//   }
//   }
// return filtered;
// };
//
// });
