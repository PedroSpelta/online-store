import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductDetails extends Component {
  render() {
    const { match } = this.props;
    const { params } = match;
    const { input } = params;
    return (
      <h1 data-testid="product-detail-name">{input}</h1>
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
};
export default ProductDetails;
