soaApp.controller('MyAccountController', function($scope, AuthService, CustomerService, UserCustomerService) {
	$scope.title = "Meus dados";
	$scope.isReadOnly = true;
	$scope.hidePassword = true;
	$scope.showPwdLink = true;
	$scope.customer = AuthService.getCustomer();

	$scope.showPasswordField = function() {
		$scope.hidePassword = false;
		$scope.showPwdLink = false;
	};

	$scope.saveCustomer = function() {
		var formData = $scope.customer;		
		
		CustomerService.get({id: formData.CustomerId}, function(customer, getResponseHeaders) {
			customer.name = formData.name;
			customer.address = formData.address;
			customer.city = formData.city;
			customer.state = formData.state;
			customer.zip = formData.zip;
			customer.mobile = formData.mobile;
			
			customer.$update(function(){
				updateUserCustomer();
			});
		});
		
	};

  var updateUserCustomer = function() {
  	var message = 'Cadastro atualizado com sucesso!';
  	if($scope.customer.password) {
      var userCustomerId = AuthService.getUserCustomerId();
			
			UserCustomerService.get({id: userCustomerId}, function(userCustomer, getResponseHeaders) {
				userCustomer.password = $scope.customer.password;
				userCustomer.$update(function() {
					alert(message);
				});
			});
			
  	}
  	else {
  		alert(message);
  	}
  };
  
});