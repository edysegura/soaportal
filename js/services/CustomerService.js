soaApp.factory('CustomerService', function($resource) {
	return $resource(
		'http://siecolacrm.azurewebsites.net/api/customer/:id',
		{id: '@CustomerId'}, //default params
		{
			'update': {
				method: 'PUT'
			}
		}
	);
});