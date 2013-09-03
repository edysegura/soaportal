soaApp.factory('AuthService', function(UserCustomerService, CustomerService) {
	var customers = [],
	    userAccount = {};
	
	var init = function() {
		userAccount = getUserAccount();
		if(!userAccount.isLogged) {
			customers = UserCustomerService.query();
		}
	};
	
	var getUserAccount = function() {
		var json = window.sessionStorage.getItem('userAccount');
		if(json) {
			userAccount = JSON.parse(json);
		}
		else {
			userAccount.isLogged = false;
			userAccount.customer = null;
			userAccount.userCustomer = null;
		}
		return userAccount;
	};
	
	init();
	
	var authService = {};

	authService.LOGIN_MESSAGE = 'Você precisa estar autenticado para acessar esta página.';
	
	authService.authenticate = function(login, password) {
		var userCustomer = {};

		for (var i = 0, leng = customers.length; i < leng; i++) {
			userCustomer = customers[i];
			if(login == userCustomer.login && userCustomer.password == password) {
				userAccount.isLogged = true;
				CustomerService.get({id:userCustomer.crmCustomerId}, function(customer) {
					userAccount.customer = customer;
					userAccount.userCustomer = userCustomer;
					window.sessionStorage.setItem('userAccount', JSON.stringify(userAccount));
				});
				return true;
			}
		}

		return false;
	};

	authService.logout = function() {
		this.updateCustomers();
		userAccount.isLogged = false;
		userAccount.customer = null;
		userAccount.userCustomer = null;
		window.sessionStorage.clear();
	};
	
	authService.updateCustomers = function() {
		customers = UserCustomerService.query();
	};
	
	authService.isLogged = function() {
		return userAccount.isLogged;
	};
	
	authService.getCustomer = function() {
		return userAccount.customer;
	};
	
	authService.getUserCustomer = function() {
		return userAccount.userCustomer;
	};
	
	authService.getUserCustomerId = function() {
		return userAccount.userCustomer.UserCustomerId;
	};

	authService.getCustomerName = function() {
		return userAccount.customer.name;
	};

	return authService;
});