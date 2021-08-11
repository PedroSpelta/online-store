import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import * as api from './services/api';
import Home from './components/initial/Home';
import ShoppingCart from './components/initial/ShoppingCart';
import ProductDetails from './components/initial/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
<<<<<<< HEAD
=======
        <Route
          exact
          path="/productDetails/:category/:input"
          render={ (props) => <ProductDetails { ...props } /> }
        />
>>>>>>> bfbc4a299615623f002028411281e270f7ddeac5
        <Route exact path="/shop" component={ ShoppingCart } />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
