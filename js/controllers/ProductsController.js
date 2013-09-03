soaApp.controller('ProductsController', function($scope, ProductsService, CartService, AuthService) {
	$scope.products = [];
	$scope.products = ProductsService.query();

	$scope.title = function() {
		var title = '';
		if(AuthService.isLogged()) {
			title = 'Olá ' + AuthService.getCustomerName() + '! Confira os produtos em destaque';
		}
		else {
			title = 'Produtos em destaque';
		}
		return title;
	};
	
	$scope.addToCart = function(product) {
		CartService.addItem(product);
		alert(product.nome + ' adicionado ao carrinho.');
	};

	$scope.hasItems = function() {
		return $scope.products.length > 0;
	}

});