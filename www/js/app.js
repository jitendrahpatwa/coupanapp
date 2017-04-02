// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'login.html',
    controller: 'LoginCtrl'
  })
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  /*admin*/
  .state('app.admin', {
    url: '/admin',
    views: {
      'menuContent': {
        templateUrl: 'templates/admin/home.html',
        controller:'adminCtrl'  
      }
    }
  })
    
  .state('app.admincoupons', {
    url: '/admincoupons',
    views: {
      'menuContent': {
        templateUrl: 'templates/admin/admincoupons.html',
        controller:'adminCtrl'  
      }
    }
  })
    
  .state('app.addproducts', {
    url: '/addproducts',
    views: {
      'menuContent': {
        templateUrl: 'templates/admin/addproducts.html',
        controller:'adminCtrl'  
      }
    }
  })    

  /*user*/
  .state('app.user', {
      url: '/user',
      views: {
        'menuContent': {
          templateUrl: 'templates/user/home.html',
          controller:'userhomeCtrl'
        }
      }
    })
  .state('app.getcoupons', {
      url: '/getcoupons',
      views: {
        'menuContent': {
          templateUrl: 'templates/user/getcoupons.html',
          controller:'userhomeCtrl'
        }
      }
    })
  .state('app.mycoupons', {
      url: '/mycoupons',
      views: {
        'menuContent': {
          templateUrl: 'templates/user/mycoupons.html',
          controller:'userhomeCtrl'
        }
      }
    })
  .state('app.mylists', {
      url: '/mylists',
      views: {
        'menuContent': {
          templateUrl: 'templates/user/mylists.html',
          controller:'userhomeCtrl'
        }
      }
    })
  
  
  ;
  // if none of the above states are matched, use this as the fallback
  var logg = localStorage.loggedin;
  var by = localStorage.loggedinby;
  if(logg == "Y"){
    if(by == "Admin"){
      $urlRouterProvider.otherwise('/app/admin'); 
    }else{
      $urlRouterProvider.otherwise('/app/user');   
    }
  }else{
    $urlRouterProvider.otherwise('/login');
  }
});
