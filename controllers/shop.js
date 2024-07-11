const Product = require('../models/product');
// const Cart = require('../models/cart');
const cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProdDetails = (req, res, next) =>{
  const prodId = req.params.prodId;
  Product.getProductDetails(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      path: '/products'
    });
  }); 
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.getProductDetails(prodId,  (product) =>{
    cart.addProduct(prodId, product.price);
  });
  // console.log("here"+prodId);
  res.redirect('/cart');
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
