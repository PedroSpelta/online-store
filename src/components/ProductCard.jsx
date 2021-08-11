import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  productToAdd = (product) => {
    const { call } = this.props;
    call(product);
  }

  render() {
    const { product } = this.props;
    const { title, thumbnail, price } = product;
    return (
      <div data-testid="product" className="">
        Product Card
        <h4>{title}</h4>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => this.productToAdd(product) }
        >
          Adicionar ao Carrinho
        </button>
        <Link
          data-testid="product-detail-link"
          to={ {
            pathname: `/productDetails/${product.id}/${product.title} `,
          } }
        >
          Ver Detalhes
        </Link>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  call: PropTypes.func.isRequired,
};

export default ProductCard;
