import { Link, useNavigate } from 'react-router-dom';
import ShopNestLogo from "../assets/ShopNestLogo.png";
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { logout as apiLogout } from '../api/authApi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.warn('Logout failed on server:', error?.response?.data?.message || error.message);
    }

    logout();
    navigate('/login');
  };


  return (
    <div className='border-b-2 border-gray-900'>
      <nav className='flex justify-between items-center m-8'>
        <div>
          <Link to="/" className='flex gap-3 items-center'>
            <img
              src={ShopNestLogo}
              alt="ShopNest Logo"
              className='w-10 h-10 drop-shadow-[0_0_15px_rgba(251,146,60,0.6)] rounded-lg'
            />
            <h1 className='font-bold lg:text-2xl text-lg text-white'>ShopNest</h1>
            <span className="w-2 h-2 bg-orange-500 rounded-full inline-block"></span>
          </Link>
        </div>
        <ul className='flex items-center text-xs text-gray-500 font-semibold lg:gap-10 gap-5  lg:text-lg'>
          <li>
            <Link className='group relative hover:text-white hover:scale-105 transition-transform inline-block'
            to='/shop'
            >Shop
              <span className='bg-orange-500 absolute left-0 bottom-0 w-0 h-0.5 group-hover:w-full transition-all'></span></Link>
          </li>
          <li>
            <Link className='group relative hover:text-white hover:scale-105 transition-transform inline-block'
            to='/cart'
            >Cart  ({cartItems.length})
              <span className='bg-orange-500 absolute left-0 bottom-0 w-0 h-0.5 group-hover:w-full transition-all'></span></Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to='/profile' className='group relative hover:text-white hover:scale-105 transition-transform inline-block'>Profile
                  <span className='bg-orange-500 absolute left-0 bottom-0 w-0 h-0.5 group-hover:w-full transition-all'></span></Link>
              </li>
              <li className='relative'>
                <span className='group relative inline-block text-gray-300 hover:text-white hover:scale-105 transition-transform'>Hi, {user.username}
                  <span className='bg-orange-500 absolute left-0 bottom-0 w-0 h-0.5 group-hover:w-full transition-all'></span>
                </span>
              </li>
              {user.role === 'admin' && <li>
                <Link to='/admin' className='group relative hover:text-white hover:scale-105 transition-transform inline-block'>
                  Admin
                  <span className='bg-orange-500 absolute left-0 bottom-0 w-0 h-0.5 group-hover:w-full transition-all'></span>
                </Link>
              </li>}
              <li>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='group relative hover:text-white hover:scale-105 transition-transform inline-block text-left text-gray-500'
                >
                  Logout
                  <span className='bg-orange-500 absolute left-0 bottom-0 w-0 h-0.5 group-hover:w-full transition-all'></span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className='group relative hover:text-white hover:scale-105 transition-transform inline-block'
                to='/login'
                >Login
                  <span className='bg-orange-500 absolute left-0 bottom-0 w-0 h-0.5 group-hover:w-full transition-all'></span></Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar