import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Product from './components/Product'

// Routers
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ShoppingCart from './components/ShoppingCart'

import commerce from './lib/commerce'
import Banner from './components/Banner'
import Checkout from './components/Checkout'
import Thankyou from './components/Thankyou'

const App = () => {

  const [productsList, setProductsList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [productsListByCategory, setProductsListByCategory] = useState([])
  const [cart, setCart] = useState([])
  const [orderDetails, setOrderDetails] = useState({});

  console.log(888878, cart)
  console.log(450,'productsList', productsList)
  console.log(450,"productsListByCategory", productsListByCategory)
  console.log(450,"categoryList", categoryList)

  const fetchProduct = async () => {
    try {
      const response = await commerce.products.list();
      setProductsList(response.data)

    } catch (error) {
      console.log(error)
    }
  }
  const fetchProductByCategory = async (category) => {
    try {
      const response = await commerce.products.list({
        category_slug: [category]
      });
      setProductsListByCategory(response.data)

    } catch (error) {
      console.log(error)
    }
  }


  const fetchCategories = async () => {
    try {
      const response = await commerce.categories.list();
      console.log(55, response.data)
      setCategoryList((response.data).reverse())

    } catch (error) {
      console.log(error)
    }
  }

  const addToCart = async (prodId, qty) => {
    const response = await commerce.cart.add(prodId, qty)
    console.log(89, response)
    setCart(response)
  }

  const removeFromCart = async (prodId) => {
    const response = await commerce.cart.remove(prodId)
    setCart(response)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }


  useEffect(() => {
    fetchProduct()
    fetchCart()
    fetchCategories()
  }, [])

  return (
    <BrowserRouter>
      <Header cart={cart} categoryList={categoryList} />
      <Routes>

        <Route path='/' element={<><Banner /><Product productsList={productsList} addToCart={addToCart} /></>} />

        <Route path='/cart' element={<ShoppingCart cart={cart} removeFromCart={removeFromCart} />} />

        <Route path='/category/:slug' element={<><div style={{ marginBottom: "320px" }}></div><Product productsList={productsListByCategory}
          fetchProductByCategory={fetchProductByCategory}
          addToCart={addToCart} /></>} />
        
        <Route path='/checkout' element={<Checkout cart={cart} />} />
        
        <Route path='/thankyou' element={<Thankyou/>} />

        <Route path='*' element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App