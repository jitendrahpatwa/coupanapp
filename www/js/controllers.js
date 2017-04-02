//angular.module('starter.controllers', [])

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  //menu 
  $scope.menusby = localStorage.loggedinby;

  //logout
  $scope.logout = function(){
    localStorage.loggedinby = '';
    localStorage.loggedin = '';
    ionic.Platform.exitApp();
  }
})

.controller('userhomeCtrl', function($scope,$ionicPopup,$ionicLoading,$http,userserv) {
  

  /*var data = 'email='+'john@mail.com'+'&password='+'john1234&type=Login';//{
    //email:'john@mail.com',
    //password:'john1234'
  //};
  $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+data)
  .success(function(res){
    console.log(res);
  })
  .error(function(err){
    console.error(err);
  });*/

 
  //Fetch all product list
  $scope.productlist = userserv.listproducts;
  $scope.code = {'ccode':''};
  $scope.getthat = function(id,type,name,price){
      
      var cp = '<label class="item item-input item-floating-label">'+
        '<span class="input-label">You have Coupon</span>'+
        '<input type="text" placeholder="coupon code" style="color:red" ng-model="code.ccode">'+
      '</label><br>';
    $ionicPopup.show({
        title:'Product '+name,
        content:'By this '+name+' product<br>'+cp,
        scope:$scope,
        buttons:[
            {
                text:'Get Product',
                type:'button-royal',
                onTap:function(r){
                    $ionicLoading.show({template:'Processing'}); 
                    if($scope.code.ccode == "" ||$scope.code.ccode == null){
                        alert("You should have to provide coupon code");
                    }else{
                        var code= $scope.code.ccode;
                        var mycouponsdata = 'userid='+localStorage.id+'&ptype='+type+'&code='+code+'&type=UserOwnCouponsCheck',mycoupon=new Array();
                          $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+mycouponsdata)
                          .success(function(res){
                            var d = JSON.parse(JSON.stringify(res));
                            if(d.status=="done"){
                                var dt = d.data;//JSON.parse(JSON.stringify(d.data));
                                $ionicLoading.hide();
                                console.log("pay");
                                var finl = eval(price-d.cvalue);
                                $ionicPopup.show({
                                    title:'Product '+name,
                                    content:'You can save amount -'+d.cvalue+' <br>Final amount you pay is '+finl+'<br>and One step to buy '+name+' product<br>',
                                    scope:$scope,
                                    buttons:[
                                        {
                                            text:'Buy Product',
                                            type:'button-balanced',
                                            onTap:function(r){
                                               userserv.buyproduct(price,id,d.cid,code,finl,name,$scope,$ionicLoading,$ionicPopup,$http);
                                            }
                                        },
                                        { text: 'Cancel' }
                                        ]
                                });
                                
                            }else{
                                $ionicLoading.hide();
                                alert("Coupon Code Is Only Available with "+type+" products or you dont have a coupon that you have type");
                            }
                          })
                          .error(function(err){
                            $ionicLoading.hide();
                            console.error(err);
                            alert("can not fetch try again");
                          }); 
                    }
                    //getCoupon($scope,id,code,name,price,type,$http,$ionicPopup,$ionicLoading);
                }
            },
            { text: 'Cancel' }
        ]
    });
  }


  //Fetch all available coupons list
  $scope.coupons = userserv.coupons;

  $scope.viewCoupon = function(id,code,name,price,type){
    userserv.viewCoupon($scope,id,code,name,price,type,$http,$ionicPopup,$ionicLoading);
  };

  //Fetch my coupons 
  $scope.mycoupons = userserv.mycoupon;
  console.log($scope.mycoupons);
    
    
    //All allproducts
    
    $scope.allproducts = userserv.allproducts;
    console.log($scope.allproducts);
})


.controller('LoginCtrl', function($scope, $state,$ionicPopup,$ionicLoading,$timeout,$interval,$http,loginserv) {
  
  //Creating Model For Login & Registration
  $scope.login = {
    'Email':'','Password':''
  };
  $scope.register = {
    'Name':'','Email':'','Password':'','Address':'','choice':''
  }

  //scope value for hiding login registration
  $scope.log = false;
  $scope.reg = true;

  //login function
  $scope.callLogin = function(){
    console.info($scope.login);
    loginserv.doLogin($scope,$ionicPopup,$ionicLoading,$http,$state);
  };

  //showing register page
  $scope.showregister = function(){
    $scope.log = true;
    $scope.reg = false;
  };

  //registration function
  $scope.callregister = function(){
    console.info($scope.register);
    loginserv.doRegister($scope,$ionicPopup,$ionicLoading,$http);
  };

  //showing login page
  $scope.showlogin = function(){
    $scope.log = false;
    $scope.reg = true;
  };
})


.controller('adminCtrl',function($scope,$http,$ionicLoading,$ionicPopup,adminserv){
    //get Coupons list
    $scope.coupons = adminserv.listcoupons;
    
    $scope.viewCoupon = function(id,code,name,price,type){
        $ionicPopup.show({
            title:'Coupon '+name,
            content:'I created a coupon with reduction amount Rs:'+price+' for '+type+'<br>Coupon Code:<h2><b>'+code+'</b></h2>',
            buttons:[
                {
                    text:'OK',
                    type:'button-royal',
                    onTap:function(r){
                        
                    }
                }
            ]
        });
    }
    
    //model for add coupon
    $scope.coupon = {
        'name':'',
        'type':'',
        'reduction':''
    }
    $scope.addcoupon = function(){
        adminserv.addcoupon($scope,$http,$ionicLoading,$ionicPopup);
    }
    
    $scope.ValidateAmount = function(event)
    {
        if ((event.keyCode < 48 || event.keyCode > 57)) 
        {
            console.error("its chars");
           event.returnValue = false;
        }
    }
    
    //add product model & functions
    $scope.product = {
        'name':'',
        'type':'',
        'description':'',
        'image':'',
        'price':''
    }
    $scope.addproduct = function(){
        adminserv.addproduct($scope,$http,$ionicLoading,$ionicPopup);
    }
    
});
