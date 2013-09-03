soaApp.controller('OrdersController', function($scope, OrderService, CartService, AuthService) {
	$scope.title = 'Lista de Pedidos';
	$scope.statusMessage = 'Buscando pedidos...';
	$scope.orders = [];

	var init = function() {
		OrderService.userOrders.query (
			{ userCustomerId: AuthService.getUserCustomerId() },
			//success
			function(orders) {
				if(orders.length > 0) {
					$scope.orders = orders;
				}
				else {
					$scope.statusMessage = 'Nenhum pedido foi encontrado.';
				}
			},
			//error
			function(response) {
				$scope.statusMessage = 'Error: ' + response.data.Message;
				alert(response.data.Message);
			}
		);
	};
	//initialization
	init();

	$scope.hasOrders = function() {
		return $scope.orders.length > 0;
	};
});