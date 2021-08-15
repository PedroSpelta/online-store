import React, { Component } from 'react';

class CheckOut extends Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      fullPrice: 0,
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.getFullPrice = this.getFullPrice.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  getFullPrice(productList) {
    let fullPrice = 0;
    for (let index = 0; index < productList.length; index += 1) {
      fullPrice += productList[index].data.price * productList[index].quantity;
    }
    fullPrice = (Math.round(fullPrice * 100)) / 100;
    this.setState({ fullPrice });
  }

  fetchProducts() {
    const localFetch = localStorage.getItem('treated');
    const localData = JSON.parse(localFetch);
    this.setState({ productList: localData });
    this.getFullPrice(localData);
  }

  render() {
    const { productList, fullPrice } = this.state;
    return (
      <>
        <div>
          {productList.map((product) => (
            <div key={ product.data.id }>
              <h2>{product.data.title}</h2>
              <h3>{product.quantity}</h3>
              <h3>{product.data.price}</h3>
            </div>
          ))}
          <h2>
            Total:
            {' '}
            {fullPrice}
          </h2>
        </div>
        <div>
          <input
            type="text"
            placeholder="Nome completo"
            data-testid="checkout-fullname"
          />
          <input type="text" placeholder="Email" data-testid="checkout-email" />
          <input type="text" placeholder="Cpf" data-testid="checkout-cpf" />
          <input
            type="text"
            placeholder="Número de telefone"
            data-testid="checkout-phone"
          />
          <input type="text" placeholder="CEP" data-testid="checkout-cep" />
          <input
            type="text"
            placeholder="Endereço"
            data-testid="checkout-address"
          />
        </div>
        <div>metodo de pag</div>
        <button type="button">Comprar</button>
      </>
    );
  }
}

export default CheckOut;
