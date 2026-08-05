import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import Loading from "../components/Loading";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(id);
                setProduct(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if(product){
            dispatch(addToCart({
                productId: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                qty: 1
        }));
        alert('Product added to your cart');
        }
    }

    if (loading) return <Loading/>
    if (!product) return <p className="text-orange-500 h-screen text-center mt-20 text-xl font-semibold">Product not found</p>;

    return (
        <div className="p-8 text-white flex flex-col lg:flex-row gap-12 ">
            <img src={product.imageUrl} alt={product.name} className="mb-10 w-64 h-64 object-cover rounded-lg object-bottom-right" />
            <div>
                <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
                <p className="text-orange-500 text-xl font-bold mt-2">₹{product.price}</p>
                <p className="mt-4 text-gray-300">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    disabled={!product.stock}
                    className="mt-3 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {product.stock ? 'Add to cart' : 'Out of stock'}
                </button>
                {product.stock ? (
                    <p className="text-green-500 text-sm my-3 italic">In stock</p>
                ):(
                    <p className="text-red-500 text-sm my-3 italic">Out of stock</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;