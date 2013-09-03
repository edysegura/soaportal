soaApp.controller('NavigationController', function($scope, $location, AuthService) {

	$scope.isValidUser = function($event) {
		if(!AuthService.isLogged()) {
			alert(AuthService.LOGIN_MESSAGE);
			$location.path('/login');
			$event.preventDefault();
		}
	}

	$scope.logout = function($event) {
		if(confirm('Deseja fazer o logout?')) {
			AuthService.logout();		
			$location.path('/');
		}
		$event.preventDefault();
	}

	$scope.isAuthenticated = function() {
		return AuthService.isLogged();
	}

});