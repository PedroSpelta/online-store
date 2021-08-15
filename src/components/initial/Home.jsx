import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { RiShoppingCartLine } from 'react-icons/ri';
import * as api from '../../services/api';
import CategoriesList from '../CategoriesList';
import ProductList from '../ProductList';

// agora vai!!!

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      catId: '',
      input: '',
      products: [],
      productsCart: [],
    };

    this.fetchCategoriesList = this.fetchCategoriesList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.setProductsCart = this.setProductsCart.bind(this);
    this.insertNewProduct = this.insertNewProduct.bind(this);
    this.updateLocal = this.updateLocal.bind(this);
  }

  componentDidMount() {
    this.setProductsCart();
    this.fetchCategoriesList();
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleChangeCategory(radioValue) {
    this.setState({
      catId: radioValue,
    });
    this.fetchProducts(radioValue);
  }

  setProductsCart() {
    const localData = localStorage.getItem('treated');
    if (localData === null) {
      localStorage.setItem('treated', JSON.stringify([]));
    }
    const actualData = localStorage.getItem('treated');
    this.setState({ productsCart: JSON.parse(actualData) });
  }

  addToCart = (newProduct) => {
    const { productsCart } = this.state;
    const newProductsCart = this.insertNewProduct(productsCart, newProduct);
    this.setState({ productsCart: newProductsCart });

    this.updateLocal(newProductsCart);
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

  submitQuery() {
    const { catId } = this.state;
    this.fetchProducts(catId);
  }

  async fetchProducts(catId) {
    const { input } = this.state;
    const fetch = await api.getProductsFromCategoryAndQuery(catId, input);
    const results = await fetch.results;
    this.setState({ products: results });
  }

  async fetchCategoriesList() {
    try {
      const fetch = await api.getCategories();
      this.setState({
        categories: fetch,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { products, categories, catId, productsCart } = this.state;

    return (
      <>
        <input
          type="text"
          placeholder="Digite o nome do produto"
          data-testid="query-input"
          onChange={ this.handleChange }
          name="input"
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.submitQuery }
        >
          Buscar
        </button>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <CategoriesList
          categories={ categories }
          handleChangeCategory={ this.handleChangeCategory }
          catId={ catId }
        />
        <ProductList products={ products } callToAdd={ this.addToCart } />
        <Link
          to={ { pathname: '/shop', state: { productsCart } } }
          data-testid="shopping-cart-button"
        >
          Carrinho de compras com
          <span>{` ${productsCart.length} `}</span>
          itens
        </Link>
      </>
    );
  }
}

export default Home;
