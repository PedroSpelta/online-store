import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.addToLocal = this.addToLocal.bind(this);
    this.insertNewProduct = this.insertNewProduct.bind(this);
    this.updateLocal = this.updateLocal.bind(this);
    console.log(this.props.location.data);
  }

  addToLocal(newProduct) {
    const productList = localStorage.getItem('treated');
    const newProductList = this.insertNewProduct(JSON.parse(productList), newProduct);
    this.updateLocal(newProductList);
  }

  insertNewProduct(productList, newProduct) {
    for (let index = 0; index < productList.length; index += 1) {
      if (productList[index].data.id === newProduct.id) {
        productList[index].quantity += 1;
        return productList;
      }
    }
    productList.push({ data: newProduct, quantity: 1 });
    return productList;
  }

  updateLocal(productList) {
    localStorage.setItem('treated', JSON.stringify(productList));
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
        product: PropTypes.objectOf(PropTypes.string || PropTypes.number),
      }),
    },
  ).isRequired,
};
export default ProductDetails;
