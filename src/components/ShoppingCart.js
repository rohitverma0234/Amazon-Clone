import React from 'react'
import './ShoppingCart.css'
import {useNavigate} from 'react-router-dom'

const ShoppingCart = ({ cart, removeFromCart }) => {
  
  const navigate = useNavigate();
  console.log(66, navigate)
  

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className='checkout_ad' src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Shopping_Feb22/1500x250PCbanneFeb22.jpg" alt="" />
        {/* <h3>Cart Details</h3> */}


        <div>
          <h3>Hello Vikas Sharma</h3>
          <h2 className='checkout__title'>Your Shopping Basket</h2>
          {
            cart?.line_items?.map((items) => {
              console.log(34567,items)
              return <div className="checkoutProduct" key={items.id}>
                <img src={items.image.url} alt="" />

                <div className="chectoutProduct__info">
                  <p className="chectoutProduct__title">{items.name}</p>
                  <p className="chectoutProduct__price">
                    <strong>{items.price.formatted_with_symbol} * {items.quantity} = {cart.currency.symbol} {items.price.raw * items.quantity}</strong>
                  </p>
                  <button onClick={() => removeFromCart(items.id)}>Remove from Basket</button>
                </div>
              </div>
            })
          }
         

        </div>
      </div>

      <div className="checkout__right">
        <div className="subtotal">
          <p>Subtotal ({cart?.total_items} items): <strong>{cart?.subtotal?.formatted_with_symbol}</strong></p>
          <small>
            <input type="checkbox" name="" id="" />
            this  Order containers a gift
          </small>
        </div>
        <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      </div>

    </div>
  )
}

export default ShoppingCart