soaApp.controller('PreOrderController', function($scope, $location, CartService, AuthService, OrderService) {
	$scope.title = 'Resumo do pedido';
	$scope.statusMessage  = 'Processando pedido...';
	$scope.isProcessing = true;
	$scope.items = CartService.getItems();
	$scope.preOrder = null;
	$scope.shipping = 0;

	var init = function() {
		if(!$scope.preOrder) {
			var order = new OrderService.order(),
			    items = $scope.items,
			    item  = {};

			order.UserCustomerId = AuthService.getUserCustomerId();
			order.OrderItem = [];

			for (var i = 0, leng = items.length; i < leng; i++) {
				item = items[i];
				order.OrderItem.push({
					ProductId: item.product.ProductId,
					quantidade: item.quantity
				});
			}

			order.$save(
	            //success
	            function(savedPreOrder, getHeaders) {
	            	console.log(savedPreOrder);
	            	$scope.preOrder = savedPreOrder;
	            	getShippingCost(savedPreOrder);
	            },
	            //error
	            function(response) {
	            	$scope.statusMessage  = 'Error: ' + response.data.Message;
	                alert(response.data.Message);
	            }
	        );
		}
	};
	//initialization
	init();

	var getShippingCost = function(preOrder) {
		OrderService.shippingCost.get (
			{orderId: preOrder.OrderId},
			//success
            function(updatedPreOrder, getHeaders) {
            	$scope.isProcessing = false;
            	console.log(updatedPreOrder);
            	$scope.shipping = updatedPreOrder.precoFrete;
            },
            //error
            function(response) {
            	console.log(response);
                alert('Error to calculate the shipping.');
                $scope.statusMessage = 'Error to calculate the shipping. ' + response.data.Message;
            }
		);
	};

	$scope.getTotal = function() {
		var items = $scope.items,
			total = $scope.shipping || 0;

		for (var i = 0, leng = items.length; i < leng; i++) {
			total += items[i].total;
		};

		return total;
	};

	$scope.cancelOrder = function($event) {
		if(confirm('Cancelar este pedido?')) {
			$scope.preOrder.$delete();
			$location.path('/cart');
		}
		$event.preventDefault();
	};

	$scope.makeOrder = function($event) {
		if(AuthService.isLogged()) {
			if(!$scope.isProcessing) {
				if(confirm('Finalizar pedido?')) {
					OrderService.closeOrder.close (
						{orderId: $scope.preOrder.OrderId}
					);
					CartService.removeAll();
					$location.path('/orders');
				}
			}
		}
		else {
			alert(AuthService.LOGIN_MESSAGE);
		}
		$event.preventDefault();
	};

});