soaApp.controller('ProductController', function($scope, $routeParams, $location, ProductsService, CartService) {
	$scope.product = [];
	$scope.product = ProductsService.get({id:$routeParams.id});

	$scope.buy = function(product) {
		CartService.addItem(product);
		$location.path('/cart');
	};

});