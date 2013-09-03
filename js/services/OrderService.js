soaApp.factory('OrderService', function($resource) {
	var orderServices = {};

	orderServices.order = $resource (
		'http://siecolavendas.azurewebsites.net/api/order',
		{id: '@OrderId'} //default params
	);

	orderServices.shippingCost = $resource (
		'http://siecolavendas.azurewebsites.net/api/order/calcularfrete/:orderId'
	);

	orderServices.closeOrder = $resource (
		'http://siecolavendas.azurewebsites.net/api/order/fecharpedido/:orderId',
		{orderId:'@orderId'}, //default params
		{
			'close': {
				method: 'PUT',
				params: {orderId:'@orderId'},
				isArray: false
			}
		}
	);

	orderServices.userOrders = $resource (
		'http://siecolavendas.azurewebsites.net/api/order/ordersbyuserid/:userCustomerId',
		{userCustomerId:'@userCustomerId'}
	);

	return orderServices;
});