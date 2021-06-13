import './App.css'
import React from 'react'
import data from './data.json'
import Products from './components/Products'
import Filter from './components/Filter';
import Cart from './components/Cart'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products.slice().sort((a,b) => a._id < b._id ? 1 : -1),
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: "",
    };
  }
  createOrder = order => {
    alert("this is order for " + order.name)
  }
  removeFromCart = product => {
    let cartItems = this.state.cartItems.slice()
    cartItems = cartItems.filter(x => x._id !== product._id)
    this.setState({
      cartItems,
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }
  addToCart = product => {
    const cartItems = this.state.cartItems.slice()
    let alreadyInCart = false
    cartItems.forEach(item => {
      if(item._id === product._id) {
        item.count++
        alreadyInCart = true
      }
    })
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1})
    }
    this.setState({cartItems})
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }
  sortProducts = event => {
    const sort = event.target.value
    this.setState(state => ({
      sort,
      products: this.state.products
      .slice()
      .sort((a, b) => 
        sort === 'lowest' ? 
          a.price > b.price ? 1 : -1
          :
          sort === 'highest' ? 
            a.price < b.price ? 1 : -1
            :
            a._id < b._id ? 1 : -1
      )
    }))
  }

  filterProducts = event => {
    if(event.target.value === ""){
      this.setState({size: event.target.value, products: data.products.slice().sort((a,b) => a._id < b._id ? 1 : -1)})
    }else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
      })
    }
  }
  render() {
    return (
      <div className="grid-container">
      <header>
        <a href="/">React shop</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
            />
            <Products products={this.state.products} addToCart={this.addToCart}/>
          </div>
          <div className="sidebar">
            <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}/>
          </div>
        </div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  )
}
}

export default App
