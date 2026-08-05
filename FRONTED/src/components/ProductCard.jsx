import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const rating = Number(product.rating ?? 0);

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 flex flex-col items-center shadow-lg shadow-black/20">
      <div className="relative w-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover object-center"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white uppercase tracking-[0.12em]">
          {product.stock ? 'In stock' : 'Sold out'}
        </span>
      </div>
      <div className="p-4 text-center w-full">
        <h3 className="text-white font-semibold text-lg leading-snug overflow-hidden">{product.name}</h3>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-amber-400">
          <span>{'★'.repeat(Math.floor(rating))}</span>
          <span className="text-zinc-400">({product.numReview ?? 0})</span>
        </div>
        <p className="text-orange-500 font-bold mt-3 text-xl">₹{product.price}</p>
        <Link to={`/product/${product._id}`} className="inline-block mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;