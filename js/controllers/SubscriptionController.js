soaApp.controller('SubscriptionController', function($scope, $location, CustomerService, UserCustomerService) {
	$scope.title = 'Cadastro';
	
	$scope.saveCustomer = function() {
		var formData = $scope.customer,
		    customer = new CustomerService();
    
        customer.cpf = formData.cpf;
        customer.name = formData.name;
        customer.address = formData.address;
        customer.city = formData.city;
        customer.state = formData.state;
        customer.country = 'Brazil';
        customer.zip = formData.zip;
        customer.email = formData.email;
        customer.mobile = formData.mobile;

        customer.$save(
            //success
            function(savedCustomer, putResponseHeaders) {
                addUserCustomer(savedCustomer);
            },
            //error
            function(response) {
                alert(response.data.Message);
            }
        );
	};

    var addUserCustomer = function(savedCustomer) {
        var userCustomer = new UserCustomerService();
                
        userCustomer.crmCustomerId = savedCustomer.CustomerId;
        userCustomer.cpf = savedCustomer.cpf;
        userCustomer.login = savedCustomer.email;
        userCustomer.password = $scope.customer.password;
        userCustomer.email = savedCustomer.email;
        userCustomer.role = 'user';

        userCustomer.$save(
            //success
            function(savedUserCustomer, putResponseHeaders) {
                alert('Cadastro realizado com sucesso!');
                $location.path('/');
            },
            //error
            function(response) {
                alert(response.data.Message);
            }
        );
    };
});