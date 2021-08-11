import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetails extends Component {
  constructor() {
    super();
    this.addToLocal = this.addToLocal.bind(this);
  }

  addToLocal(product) {
    const localData = JSON.parse(localStorage.getItem('cart'));
    if (localData === null) {
      localStorage.setItem('cart', JSON.stringify([product]));
      return;
    }
    localData.push(product);
    localStorage.setItem('cart', JSON.stringify(localData));
  }

  render() {
    const { match, location } = this.props;
    const { data } = location;
    const { product } = data;
    const { params } = match;
    const { input } = params;
    return (
      <>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToLocal(product) }
        >
          Adicionar ao carrinho
        </button>
        <Link to="/shop" data-testid="shopping-cart-button">
          Ir para o carrinho
        </Link>
        <h1 data-testid="product-detail-name">{input}</h1>
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      input: PropTypes.string,
      category: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape(
    {
      data: PropTypes.shape({
        product: PropTypes.objectOf(PropTypes.string),
      }),
    },
  ).isRequired,
};
export default ProductDetails;
