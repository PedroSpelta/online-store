import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price } = product;

    return (
      <div data-testid="product" className="">
        Product Card
        <h4>{ title }</h4>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProductCard;