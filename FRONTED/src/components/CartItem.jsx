import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/features/cartSlice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const handleQty = (item, qty) => {
        if (qty > 0) {
            dispatch(addToCart({ ...item, qty }));
        }
    };

    const removeItem = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="flex flex-col sm:flex-row w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 sm:p-6 hover:border-orange-500 hover:translate-x-1 transition-all duration-300">
            <img
                src={item.imageUrl}
                alt={item.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl object-cover mx-auto sm:mx-0 sm:mr-6"
            />
            <div className="flex-1 flex flex-col gap-2 mt-4 sm:mt-0">
                <h3 className="text-lg sm:text-xl font-semibold wrap-break-word">
                    {item.name}</h3>
                <p className='text-sm font-medium'>₹{item.price}</p>
                <div className='flex mt-4 gap-3 items-center'>
                    <button
                        onClick={() => handleQty(item, item.qty - 1)}
                        className='w-8 h-8 border rounded-lg bg-zinc-700 border-zinc-700/50 hover:bg-orange-500 hover:border-zinc-800 transition duration-300'
                    >-</button>
                    <p>{item.qty}</p>
                    <button
                        onClick={() => handleQty(item, item.qty + 1)}
                        className='w-8 h-8 border rounded-lg bg-zinc-700 border-zinc-700/50 hover:bg-orange-500 hover:border-zinc-800 transition duration-300'
                    >+</button>
                </div>
                <button
                    onClick={() => removeItem(item.productId)}
                    className='w-32 py-2 text-red-500 border border-red-500/30 bg-red-600/10 rounded-lg hover:bg-red-500/20 transition '
                >Remove</button>
            </div>
        </div>
    )
}

export default CartItem