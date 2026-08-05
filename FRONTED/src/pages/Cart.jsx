import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  return (
    <div className='h-full text-white mx-10 my-8'>
      <h1 className='text-4xl font-bold'>Shopping cart</h1>
      {cartItems.length === 0 ? (
        <div className='mt-10 rounded-3xl border border-zinc-700 bg-zinc-900 p-10 text-center'>
          <p className='text-white text-lg font-semibold'>Your cart is empty.</p>
          <p className='text-zinc-400 mt-3'>Add items to your cart to continue shopping.</p>
          <button
            onClick={() => navigate('/shop')}
            className='mt-6 rounded-2xl bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition'
          >
            Shop now
          </button>
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row gap-5 my-10 '>
          <div className='flex flex-col gap-4 max-w-175 w-full'>
            {cartItems.map((item) => <CartItem key={item.productId} item={item} />)}
          </div>
          <div className='lg:sticky lg:top-5 lg:self-start h-fit w-full  lg:w-95  border border-zinc-700 rounded-2xl ml-25 bg-zinc-900 '>
            <h2 className='mx-8 mt-9 mb-6 text-2xl font-bold '>
              Total: ₹{totalPrice.toFixed(2)}
            </h2>
            <div className='border border-zinc-700 mx-7'></div>
            <button
              onClick={() => navigate('/check-out')}
              className='font-semibold text-white text-center w-80 h-12 rounded-xl my-6 bg-orange-500 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(249,115,22,0.55)] transition-all mx-7 border-transparent'>
              Proceed to checkout
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Cart