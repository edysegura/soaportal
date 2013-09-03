soaApp.controller('LoginController', function($scope, $location, AuthService) {
	$scope.title = 'Identificação';
	AuthService.updateCustomers();
	
	$scope.authenticate = function() {
		var isValid = AuthService.authenticate($scope.login, $scope.password);
		if (isValid) {
			$location.path('/');
		}
		else {
			alert('Dados inválidos! Tente novamente.');
			$scope.login = $scope.password = '';
		}
	}
});