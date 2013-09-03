soaApp.controller('CartController', function($scope, $location, CartService, AuthService) {
	$scope.title = 'Carrinho de Compras';
	$scope.items = CartService.getItems();

	$scope.getTotal = function() {
		var items = $scope.items,
				total = 0;

		for (var i = 0, leng = items.length; i < leng; i++) {
			total += items[i].total;
		};

		return total;
	};

	$scope.updateTotal = function(item) {
		item.total = item.product.preco * item.quantity;
		CartService.save();
	};

	$scope.remove = function(product) {
		if(confirm('Deseja remover '+ product.nome +' do carrinho?')) {
			$scope.items = CartService.removeItem(product.ProductId);
		}
	};

	$scope.hasItem = function() {
		return $scope.items.length > 0;
	};

	$scope.makeOrder = function($event) {
		if(AuthService.isLogged() && $scope.hasItem()) {
			$location.path('/pre-order');
		}
		else {
			alert(AuthService.LOGIN_MESSAGE);
		}
		$event.preventDefault();
	};

});