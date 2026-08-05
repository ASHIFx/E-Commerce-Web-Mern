import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { clearCart } from '../redux/features/cartSlice';

const CheckOut = () => {
    const { user } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        fullname: '', street: '', city: '', postalCode: '', country: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const getToken = () => user?.accessToken || localStorage.getItem('accessToken');

    const handleOrderPlacement = async (paymentId) => {
        const token = getToken();

        const orderItems = cartItems.map((item) => ({
            productId: item.productId || item._id || item.id,
            quantity: item.qty ?? item.quantity,
            price: item.price,
        }));

        const orderResponse = await api.post(
            '/orders',
            {
                items: orderItems,
                totalAmount: totalPrice,
                address: {
                    fullName: address.fullname,
                    street: address.street,
                    city: address.city,
                    postalCode: address.postalCode,
                    country: address.country,
                },
                paymentId,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        dispatch(clearCart());
        navigate('/order-success', { state: { orderId: orderResponse.data._id } });
    };

    const handlePayment = async () => {
        setError('');
        setLoading(true);

        try {
            const paymentId = `TEST_PAY_${Date.now()}`;
            await handleOrderPlacement(paymentId);
        } catch (paymentError) {
            console.error(paymentError);

            if (paymentError.response?.status === 401) {
                setError('Session expired. Please login again.');
                navigate('/login');
            } else {
                setError(paymentError.response?.data?.message || 'Checkout failed.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
         console.log('submit fired', user)

        if (!user) {
            alert('Please login first');
            navigate('/login');
            return;
        }

        if (!getToken()) {
            setError('Session expired. Please login again.');
            navigate('/login');
            return;
        }

        if (cartItems.length === 0) {
            setError('Your cart is empty. Add items before checkout.');
            return;
        }

        handlePayment();
    };

    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <h1 className='text-white text-4xl font-bold mb-6'>Checkout</h1>
            <div className='grid gap-8 lg:grid-cols-[2fr_1fr]'>
                <section className='rounded-3xl bg-zinc-950 p-8 shadow-xl border border-white/5'>
                    <h2 className='text-xl font-semibold text-white mb-4'>Shipping information</h2>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='grid gap-4 sm:grid-cols-2'>
                            <input placeholder='Full name' required value={address.fullname}
                                onChange={(e) => setAddress({ ...address, fullname: e.target.value })}
                                className='w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-500' />
                            <input placeholder='Street address' required value={address.street}
                                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                className='w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-500' />
                        </div>
                        <div className='grid gap-4 sm:grid-cols-3'>
                            <input placeholder='City' required value={address.city}
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                className='w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-500' />
                            <input placeholder='Postal code' required value={address.postalCode}
                                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                                className='w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-500' />
                            <input placeholder='Country' required value={address.country}
                                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                className='w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-500' />
                        </div>
                        {error && (
                            <p className='rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
                                {error}
                            </p>
                        )}
                        <button type='submit' disabled={loading}
                            className='w-full rounded-2xl bg-orange-500 px-6 py-4 text-center font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60'>
                            {loading ? 'Processing order…' : 'Place order (Test Mode)'}
                        </button>
                    </form>
                </section>

                <aside className='rounded-3xl bg-zinc-950 p-8 shadow-xl border border-white/5'>
                    <h2 className='text-xl font-semibold text-white mb-4'>Order summary</h2>
                    <div className='space-y-4'>
                        {cartItems.map((item) => (
                            <div key={item.productId} className='rounded-2xl border border-zinc-800 bg-zinc-900 p-4'>
                                <div className='flex items-center justify-between gap-4'>
                                    <div>
                                        <p className='text-white font-semibold'>{item.name || 'Product'}</p>
                                        <p className='text-sm text-zinc-400'>Qty: {item.qty}</p>
                                    </div>
                                    <p className='text-white'>₹{(item.price * item.qty).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-6 rounded-2xl border border-white/10 bg-black/40 p-4'>
                        <div className='flex justify-between text-sm text-zinc-400'>
                            <span>Subtotal</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className='mt-4 flex justify-between text-lg font-semibold text-white'>
                            <span>Total</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className='mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4 text-sm text-orange-200'>
                        <p className='font-semibold'>Test payment mode</p>
                        <p>Razorpay bypassed — using dummy id to place order</p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CheckOut;