import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { getProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [])

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='m-10 h-full '>
      <h2 className='text-3xl font-bold text-white '>All products</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search products...'
        className='transition-all duration-300 bg-black text-white w-full max-w-xl text-lg px-4 py-3 my-4 rounded-lg border border-zinc-700 focus:outline-none focus:border-orange-500'
      />
      {loading ? (
        <Loading />
      ) : filteredProducts.length === 0 ? (
        <div className='mt-10 rounded-3xl border border-zinc-700 bg-zinc-900 p-10 text-center text-zinc-300'>
          <p className='text-lg font-semibold text-white'>No products found for "{search}".</p>
          <p className='mt-2'>Try a different search term or browse the full catalog.</p>
          <button
            onClick={() => setSearch('')}
            className='mt-6 rounded-2xl bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition'
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
          {filteredProducts.map((product) =>
            <ProductCard key={product._id} product={product} />
          )}
        </div>
      )}
    </div>
  )
}

export default Shop