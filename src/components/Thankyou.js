import React from 'react'
import { useNavigate } from 'react-router-dom'

const Thankyou = () => {
  const navigate = useNavigate()
  return (
    <div className='order__comfirm'>
      <h1>Hello Rohit</h1>
      <h2>Thank you for your order!</h2>
      <h3>Your Order Number is : 101</h3>
      <h4>Order Total : 2400</h4>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  )
}

export default Thankyou