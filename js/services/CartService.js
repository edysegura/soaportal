soaApp.factory('CartService', function() {
	var cachedItems = {},
	    cart = {};

	var getCartItems = function() {
		var json = window.localStorage.getItem('cartItems');
		if(json) {
			cachedItems = JSON.parse(json);
		}
	};
	getCartItems();

	cart.getItems = function() {
		var items = [];
		for (var productId in cachedItems) {
			items.push(cachedItems[productId]);
		};
		return items;
	};

	cart.addItem = function(product) {
		var item = cachedItems[product.ProductId];
		if(item) {
			item.quantity++;
			item.total *= item.quantity;
		}
		else {
			cachedItems[product.ProductId] = {product: product, quantity: 1, total: product.preco};
		}
		this.save();
	};

	cart.save = function() {
		window.localStorage.setItem('cartItems', JSON.stringify(cachedItems));
	};

	cart.removeItem = function(productId) {
		if(cachedItems[productId]) {
			delete cachedItems[productId];
		}
		this.save();
		return this.getItems();
	};

	cart.removeAll = function() {
		cachedItems = {};
		this.save();
	}

	return cart;
});