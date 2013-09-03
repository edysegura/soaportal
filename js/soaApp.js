var soaApp = angular.module('soaApp', ['ngResource']);

//This configures the routes and associates each route with a view and a controller
soaApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',
      {
        controller: 'ProductsController',
        templateUrl: 'html/products.html'
      })

    .when('/product/:id',
      {
        controller: 'ProductController',
        templateUrl: 'html/product.html'
      })
    
    .when('/subscription',
      {
        controller: 'SubscriptionController',
        templateUrl: 'html/customer.html'
      })

    .when('/login',
      {
        controller: 'LoginController',
        templateUrl: 'html/login.html'
      })

    .when('/cart',
      {
        controller: 'CartController',
        templateUrl: 'html/cart.html'
      })

    .when('/pre-order',
      {
        controller: 'PreOrderController',
        templateUrl: 'html/pre-order.html'
      })

    .when('/orders',
      {
        controller: 'OrdersController',
        templateUrl: 'html/orders.html'
      })

    .when('/my-account',
      {
        controller: 'MyAccountController',
        templateUrl: 'html/customer.html'
      })

    .otherwise({ redirectTo: '/' });
});

soaApp.config(['$httpProvider', function($httpProvider) {   
  $httpProvider.defaults.headers.common['Authorization'] = 'Basic QWRtaW46QWRtaW4=';
  $httpProvider.defaults.useXDomain = true;
}]);
