app.factory('loginserv',function(){
	return {
		doLogin:function($scope,$ionicPopup,$ionicLoading,$http,$state){
			$ionicLoading.show({
				template:'<ion-spinner icon="spiral"></ion-spinner>',
                showBackdrop: true
			});
			var email = $scope.login.Email;
			var pass = $scope.login.Password;
			if(email=="" || email == null){
				$ionicLoading.hide();
				$ionicPopup.alert({
					title:'Email Empty!',
					content:'Email can not be empty'
				});
			}else if(pass == "" || pass == null){
				$ionicLoading.hide();
				$ionicPopup.alert({
					title:'Password Empty!',
					content:'Password can not be empty'
				});
			}else{
				var data = 'email='+$scope.login.Email+'&password='+$scope.login.Password+'&type=Login';
                /*var data = {
                    email:$scope.login.Email,password:$scope.login.Password,type:'Login'
                };*/
				  $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+data)
				  .success(function(res){
				  	var d = JSON.parse(JSON.stringify(res));
				  	if(d.status == "done"){
				  		$ionicLoading.hide();
				  		console.info("dobe");
				  		var dt = JSON.parse(JSON.stringify(d.data));
				  		console.info(JSON.stringify(d.data));
				  		if(d.logintype == "adm"){
				  			location.href ="index.html";
				  			localStorage.loggedin = "Y";
				  			localStorage.loggedinby = "Admin";
                            localStorage.name = dt.name;
                            localStorage.id = dt.id;
                            localStorage.token = dt.token;
                            localStorage.email = dt.email;
                            localStorage.address = dt.address;
                            localStorage.gender = dt.gender;
				  			console.log(dt.name+" "+dt.email);
				  		}else if(d.logintype == "usr"){
				  			location.href ="index.html";
				  			localStorage.loggedin = "Y";
				  			localStorage.loggedinby = "User";
                            localStorage.name = dt.name;
                            localStorage.id = dt.id;
                            localStorage.token = dt.token;
                            localStorage.email = dt.email;
                            localStorage.address = dt.address;
                            localStorage.gender = dt.gender;
				  			console.log(dt.name+" "+dt.email);
				  		}
				  	}else{
				  		$ionicLoading.hide();
				  		$ionicPopup.alert({
							title:'Failed!',
							content:'Email & Password Wrong!Can not Retrieved'
						});
				  	}
				    //console.log(res);
				  })
				  .error(function(err){
				  	$ionicLoading.hide();
				    console.error(err);
				    $ionicPopup.alert({
						title:'Failed To Login',
						content:'Server Is Busy'
					});
				  });
			}
		},

		doRegister:function($scope,$ionicPopup,$ionicLoading,$http){
			$ionicLoading.show({
				template:'<ion-spinner icon="spiral"></ion-spinner>',
                showBackdrop: true
			});
			var email = $scope.register.Email;
			var pass = $scope.register.Password;
			var name = $scope.register.Name;
			var addr = $scope.register.Address;
			var gender = $scope.register.choice;
			if(email=="" || email == null){
				$ionicLoading.hide();
				$ionicPopup.alert({title:'Email Empty!',content:'Email can not be empty'});
			}else if(pass == "" || pass == null){
				$ionicLoading.hide();
				$ionicPopup.alert({title:'Password Empty!',content:'Password can not be empty'});
			}else if(name == "" || name == null){
				$ionicLoading.hide();
				$ionicPopup.alert({title:'Name Empty!',content:'Name can not be empty'});
			}else if(addr == "" || addr == null){
				$ionicLoading.hide();
				$ionicPopup.alert({title:'Address Empty!',content:'Address can not be empty'});
			}else if(gender == "" || gender == null){
				$ionicLoading.hide();
				$ionicPopup.alert({title:'Gender Empty!',content:'Gender can not be empty'});
			}else{
				var data = 'email='+$scope.register.Email+'&password='+$scope.register.Password+'&name='+$scope.register.Name+'&address='+$scope.register.Address+'&gender='+$scope.register.choice+'&type=Registration';
				  $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+data)
				  .success(function(res){
				  	console.log(res);
				  	var d = JSON.parse(JSON.stringify(res));
				  	if(d.status == "done"){
				  		$ionicLoading.hide();
				  		$ionicPopup.show({
							title:'Wow!',
							content:'Registration completed',
							buttons:[
								{
									text:'Go For Login',
									type:'button-balanced',
									onTap:function(r){
										$scope.log = false;
  										$scope.reg = true;
									}
								}
							]
						});
				  	}else if(d.status == "already"){
				  		$ionicLoading.hide();
				  		$ionicPopup.alert({
							title:'Failed!',
							content:'You already registered!'
						});
				  	}else{
				  		$ionicLoading.hide();
				  		$ionicPopup.alert({
							title:'Failed!',
							content:'Registration can not completed! Try again!'
						});
				  	}
				    //console.log(res);
				  })
				  .error(function(err){
				  	$ionicLoading.hide();
				    console.error(err);
				    $ionicPopup.alert({
						title:'Failed To Login',
						content:'Server Is Busy'
					});
				  });
			}
		},

	}
})
.factory('userserv',function($http,$ionicLoading){
	/*product lists*/
	var data = 'type=UserProductList',showall=new Array();
	  $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+data)
	  .success(function(res){
	  	var d = JSON.parse(JSON.stringify(res));
	  	if(d.status=="done"){
	  		var dt = d.data;//JSON.parse(JSON.stringify(d.data));
	  		$ionicLoading.hide();
	  		for(var i=0;i<dt.length;i++){
		    	console.log(JSON.stringify(dt[i].name));	
		    	showall.push({
		  			'id':dt[i].id,
		  			'name':dt[i].name,
		  			'desc':dt[i].description,
		  			'image':dt[i].image,
		  			'price':dt[i].price,
		  			'type':dt[i].producttype
		  		});
	  		}
	  	}else{
	  		$ionicLoading.hide();
	  		alert("not found");
	  	}
	  })
	  .error(function(err){
	  	$ionicLoading.hide();
	    console.error(err);
	    alert("can not fetch try again");
	  });  


	/*my bucket coupons*/
	var mycouponsdata = 'userid='+localStorage.id+'&type=UserOwnCoupons',mycoupon=new Array();
	  $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+mycouponsdata)
	  .success(function(res){
	  	var d = JSON.parse(JSON.stringify(res));
	  	if(d.status=="done"){
	  		var dt = d.data;//JSON.parse(JSON.stringify(d.data));
	  		$ionicLoading.hide();
	  		for(var i=0;i<dt.length;i++){
		    	console.log(JSON.stringify(dt[i].name));	
		    	mycoupon.push({
		  			'id':dt[i].id,
		  			'userid':dt[i].userid,
		  			'name':dt[i].name,
		  			'couponid':dt[i].couponid,
		  			'couponcode':dt[i].couponcode,
		  			'isbuyed':dt[i].buyedwithproduct,
		  			'productid':dt[i].productid,
		  			'pprice':dt[i].pricevalue,
		  			'cprice':dt[i].couponvalue,
		  			'tprice':dt[i].totalvalue,
		  			'created':dt[i].created
		  		});
	  		}
	  	}else{
	  		$ionicLoading.hide();
	  		alert("not found");
	  	}
	  })
	  .error(function(err){
	  	$ionicLoading.hide();
	    console.error(err);
	    alert("can not fetch try again");
	  }); 

	/*coupon list*/
	var coupondata = 'type=UserCouponList',showcoupon=new Array();
	  $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+coupondata)
	  .success(function(res){
	  	var d = JSON.parse(JSON.stringify(res));
	  	if(d.status=="done"){
	  		var dt = d.data;//JSON.parse(JSON.stringify(d.data));
	  		$ionicLoading.hide();
	  		for(var i=0;i<dt.length;i++){
		    	console.log(JSON.stringify(dt[i]));	
		    	showcoupon.push({
		  			'id':dt[i].id,
		  			'name':dt[i].name,
		  			'coupontype':dt[i].coupontype,
		  			'couponcode':dt[i].couponcode,
		  			'reduction':dt[i].reduction,
		  			'status':dt[i].status,
		  			'token':dt[i].token
		  		});
	  		}
	  	}else{
	  		$ionicLoading.hide();
	  		alert("not found");
	  	}
	  })
	  .error(function(err){
	  	$ionicLoading.hide();
	    console.error(err);
	    alert("can not fetch try again");
	  });   

	var getCoupon = function($scope,id,code,name,price,type,$http,$ionicPopup,$ionicLoading){
		var pass = 'id='+localStorage.id+'&name='+localStorage.name+'&couponcode='+code+'&couponid='+id+'&couponprice='+price+'&type=UserGetCoupon';
	  $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+pass)
	  .success(function(res){
	  	console.log(JSON.stringify(res));
	  	var d = JSON.parse(JSON.stringify(res));
	  	if(d.status=="done"){
	  		var dt = d.data;//JSON.parse(JSON.stringify(d.data));
	  		$ionicLoading.hide();
			var index = $scope.coupons.indexOf(id);
	  		$scope.coupons.splice(index, 1);  
			console.log($scope.coupons.length);
	  		alert("You have a new coupon");
	  	}else{
	  		$ionicLoading.hide();
	  		alert("not found");
	  	}
	  })
	  .error(function(err){
	  	$ionicLoading.hide();
	    console.error(err);
	    alert("can not fetch try again");
	  }); 
	};
    
    
    /*all buyed products*/
    var products=new Array();
		var pass = 'id='+localStorage.id+'&type=UserOwnProductsLists';
	  $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+pass)
	  .success(function(res){
	  	console.log(JSON.stringify(res));
	  	var d = JSON.parse(JSON.stringify(res));
	  	if(d.status=="done"){
            var dt = d.data;
	  		$ionicLoading.hide();
	  		for(var i=0;i<dt.length;i++){
		    	console.log(JSON.stringify(dt[i]));	
		    	products.push({
		  			'id':dt[i].id,
		  			'name':dt[i].name,
                    'description':dt[i].description,
		  			'couponid':dt[i].couponid,
		  			'couponcode':dt[i].couponcode,
		  			'buyedwithproduct':dt[i].buyedwithproduct,
		  			'totalvalue':dt[i].totalvalue,
                    'pricevalue':dt[i].pricevalue,
                    'couponvalue':dt[i].couponvalue,
		  			'productid':dt[i].productid,
                    'producttype':dt[i].producttype,
                    'image':dt[i].image,
                    'updated':dt[i].updated
		  		});
	  		}
	  		console.log("You have a new product "+JSON.stringify(d.data));
	  	}else{
	  		console.log("not found");
	  	}
	  })
	  .error(function(err){
	  	
	    console.error(err);
	  }); 
	return {
		listproducts:showall,
		coupons:showcoupon,
		viewCoupon:function($scope,id,code,name,price,type,$http,$ionicPopup,$ionicLoading){
			$ionicPopup.show({
				title:'Coupon '+name,
				content:'You can save a Rs:'+price+' with a product of '+type+'<br>Coupon Code is:<h2><b>'+code+'</b></h2>',
				buttons:[
					{
						text:'Get Coupon',
						type:'button-royal',
						onTap:function(r){
							getCoupon($scope,id,code,name,price,type,$http,$ionicPopup,$ionicLoading);
						}
					},
					{ text: 'Cancel' }
				]
			});
		},
		mycoupon:mycoupon,
        buyproduct:function(price,id,cid,code,finl,name,$scope,$ionicLoading,$ionicPopup,$http){
            var pass = 'userid='+localStorage.id+'&id='+cid+'&pid='+id+'&name='+localStorage.name+'&couponcode='+code+'&pricevalue='+price+'&totalvalue='+finl+'&type=UserGetProductByCoupon';
          $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+pass)
          .success(function(res){
            console.log(JSON.stringify(res));
            var d = JSON.parse(JSON.stringify(res));
            if(d.status=="done"){
                var dt = d.data;//JSON.parse(JSON.stringify(d.data));
                $ionicLoading.hide();
                alert("You buyed a product "+name);
            }else if(d.status=="already"){
                $ionicLoading.hide();
                alert("You already have a product "+name);
            }else{
                $ionicLoading.hide();
                alert("Server error to proceed");
            }
          })
          .error(function(err){
            $ionicLoading.hide();
            console.error(err);
            alert("can not fetch try again");
          }); 
        },
        allproducts:products
        
	}
})
.factory('adminserv',function($http,$ionicLoading){
    /*coupon list*/
	var coupondata = 'type=UserCouponList',couponslist=new Array();
	  $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+coupondata)
	  .success(function(res){
	  	var d = JSON.parse(JSON.stringify(res));
	  	if(d.status=="done"){
	  		var dt = d.data;//JSON.parse(JSON.stringify(d.data));
	  		$ionicLoading.hide();
	  		for(var i=0;i<dt.length;i++){
		    	console.log(JSON.stringify(dt[i]));	
		    	couponslist.push({
		  			'id':dt[i].id,
		  			'name':dt[i].name,
		  			'coupontype':dt[i].coupontype,
		  			'couponcode':dt[i].couponcode,
		  			'reduction':dt[i].reduction,
		  			'status':dt[i].status,
		  			'token':dt[i].token
		  		});
	  		}
	  	}else{
	  		$ionicLoading.hide();
	  		alert("not found");
	  	}
	  })
	  .error(function(err){
	  	$ionicLoading.hide();
	    console.error(err);
	    alert("can not fetch try again");
	  });  
    function couponcodemaking()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 8; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    return {
        listcoupons:couponslist,
        addcoupon:function($scope,$http,$ionicLoading,$ionicPopup){
            console.log($scope.coupon);
            $ionicLoading.show({template:'wait...'});
            var name = $scope.coupon.name;
            var type = $scope.coupon.type;
            var reduction = $scope.coupon.reduction;
            var couponcode = couponcodemaking();
            if(name == "" || name == null){
                $ionicLoading.hide();
                $ionicPopup.alert({
					title:'Name Empty!',
					content:'Name can not be empty'
				});
            }else if(type == "" || type == null){
                $ionicLoading.hide();
                $ionicPopup.alert({
					title:'Type Empty!',
					content:'Type can not be empty'
				});
            }else if(reduction == 0 || reduction == "" || reduction == null){
                $ionicLoading.hide();
                $ionicPopup.alert({
					title:'Reduction Empty!',
					content:'Reduction amount can not be empty'
				});
            }else{
                var pass = '&name='+name+'&couponcode='+couponcode+'&coupontype='+type+'&reduction='+reduction+'&type=AdminAddCoupon';
                  $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+pass)
                  .success(function(res){
                    console.log(JSON.stringify(res));
                    var d = JSON.parse(JSON.stringify(res));
                    if(d.status=="done"){
                        var dt = d.data;
                        $ionicLoading.hide(); 
                        alert("You created new coupon");
                    }else{
                        $ionicLoading.hide();
                        alert("not found");
                    }
                    $scope.coupon.name=$scope.coupon.type=$scope.coupon.reduction="";
                  })
                  .error(function(err){
                    $ionicLoading.hide();
                    console.error(err);
                    alert("can not fetch try again");
                  }); 
            }
        },
        addproduct:function($scope,$http,$ionicLoading,$ionicPopup){
            console.log($scope.product);
            $ionicLoading.show({template:'wait adding product...'});
            var name = $scope.product.name;
            var type = $scope.product.type;
            var price = $scope.product.price;
            var description = $scope.product.description;
            var image = $scope.product.image;
            if(name == "" || name == null){
                $ionicLoading.hide();
                $ionicPopup.alert({
					title:'Name Empty!',
					content:'Name can not be empty'
				});
            }else if(type == "" || type == null){
                $ionicLoading.hide();
                $ionicPopup.alert({
					title:'Type Empty!',
					content:'Type can not be empty'
				});
            }else if(price == 0 || price == "" || price == null){
                $ionicLoading.hide();
                $ionicPopup.alert({
					title:'Price Empty!',
					content:'Price amount can not be empty'
				});
            }else if(description == "" || description == null){
                $ionicLoading.hide();
                $ionicPopup.alert({
					title:'description Empty!',
					content:'description can not be empty'
				});
            }/*else if(image == "" || image == null){
                $ionicLoading.hide();
                $ionicPopup.alert({
					title:'Image Empty!',
					content:'Image Url can not be empty'
				});
            }*/else{
                var pass = 'name='+name+'&description='+description+'&image='+image+'&price='+price+'&ptype='+type+'&type=AdminAddProduct';
                  $http.get("https://mywebapps.000webhostapp.com/t2/server.php?"+pass)
                  .success(function(res){
                    console.log(JSON.stringify(res));
                    var d = JSON.parse(JSON.stringify(res));
                    if(d.status=="done"){
                        var dt = d.data;
                        $ionicLoading.hide(); 
                        alert("You created new product item");
                    }else{
                        $ionicLoading.hide();
                        alert("not found");
                    }
                    $scope.product.name=$scope.product.type=$scope.product.price=$scope.product.description=$scope.product.image="";
                  })
                  .error(function(err){
                    $ionicLoading.hide();
                    console.error(err);
                    alert("can not fetch try again");
                  }); 
            }
        }
    }
});