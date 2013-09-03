soaApp.factory('UserCustomerService', function($resource) {
	return $resource(
		'http://siecolavendas.azurewebsites.net/api/usercustomer/:id',
		{id: '@UserCustomerId'}, //default params
		{
			'update': {
				method: 'PUT'
			}
		}
	);
});