import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import * as api from './services/api';
import Home from './components/initial/Home';
import ShoppingCart from './components/initial/ShoppingCart';
import ProductDetails from './components/initial/ProductDetails';
import CheckOut from './components/CheckOut';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/checkout"
          component={ CheckOut }
        />
        <Route
          exact
          path="/productDetails/:category/:input"
          render={ (props) => <ProductDetails { ...props } /> }
        />
        <Route exact path="/shop" component={ ShoppingCart } />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
