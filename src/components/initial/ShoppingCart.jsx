import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
    this.loadLocal = this.loadLocal.bind(this);
    this.redProducts = this.redProducts.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  componentDidMount() {
    this.loadLocal();
  }

  loadLocal() {
    const localData = localStorage.getItem('cart');
    const cart = JSON.parse(localData);
    this.redProducts(cart);
  }

  redProducts(cart) {
    const reducedProducts = [];
    const ids = [];
    cart.forEach((product) => {
      if (!ids.includes(product.id)) {
        let acc = 0;
        for (let i = 0; i < cart.length; i += 1) {
          if (product.id === cart[i].id) {
            acc += 1;
          }
        }
        ids.push(product.id);
        reducedProducts.push({ data: product, quantity: acc });
      }
    });
    this.setState({ cart: reducedProducts });
  }

  increaseQuantity(prod) {
    const { cart } = this.state;
    for (let index = 0; index < cart.length; index += 1) {
      if (cart[index].data.id === prod.data.id) {
        cart[index].quantity += 1;
      }
    }
    this.setState({ cart });
  }

  decreaseQuantity(prod) {
    const { cart } = this.state;
    for (let index = 0; index < cart.length; index += 1) {
      if (cart[index].data.id === prod.data.id && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      }
    }
    this.setState({ cart });
  }

  render() {
    const { cart } = this.state;
    if (cart.length === 0) {
      return !cart ? (
        <div>Carregando...</div>
      ) : (
        <div>
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        </div>
      );
    }
    return (
      <div>
        {cart.map((prod) => (
          <div key={ prod.data.id }>
            <p data-testid="shopping-cart-product-name">{prod.data.title}</p>
            <p data-testid="shopping-cart-product-quantity">{prod.quantity}</p>
            <p>{prod.data.price}</p>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ () => this.decreaseQuantity(prod) }
            >
              -
            </button>
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ () => this.increaseQuantity(prod) }
            >
              +
            </button>
          </div>
        ))}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      productsCart: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
};

export default ShoppingCart;
