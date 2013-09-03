soaApp.factory('ProductsService', function($resource) {
	return $resource('http://siecolavendas.azurewebsites.net/api/product/:id');
});