import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import Loading from '../components/Loading';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className='px-4 py-7'>
      <div className='w-full h-[45vh] bg-linear-to-r from-black via-zinc-900 to-yellow-950 rounded-2xl p-12 text-center border border-orange-500/20 shadow-[0_0_60px_10px_rgba(251,146,60,0.1)] flex flex-col justify-center'>
        <h1 className='text-white text-5xl font-bold'>Welcome to ShopNest</h1>
        <p className='text-gray-300 mt-4'>Discover the best products at unbeatable prices.</p>
      </div>

      <div className='mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='text-3xl font-bold text-white'>Featured Products</h1>
        <Link
          to='/shop'
          className='inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition'
        >
          View all products
        </Link>
      </div>

      <div>
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className='mt-10 rounded-3xl border border-zinc-700 bg-zinc-900 p-10 text-center text-zinc-300'>
            No featured products available right now.
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage