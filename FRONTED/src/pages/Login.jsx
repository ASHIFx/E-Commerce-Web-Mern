import { Eye, EyeOff } from 'lucide-react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await login({ email, password });
      authLogin(res.data);
      navigate('/');
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Invalid email or password');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-[75vh] flex justify-center items-center'>
      <div className='bg-zinc-900 rounded-2xl p-10 w-full max-w-md border border-white/5 shadow-2xl'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <h2 className='text-white text-2xl font-bold text-center mb-4'>Welcome Back!</h2>

          {error && (
            <p className='bg-red-500/10 border border-red-500/30 text-red-500 text-sm text-center py-2 rounded-lg'>
              {error}
            </p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-black text-white px-4 py-3 rounded-lg border border-zinc-700 focus:outline-none focus:border-orange-500'
          />

          <div className='relative'>
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full bg-black text-white px-4 py-3 rounded-lg border border-zinc-700 focus:outline-none focus:border-orange-500'
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400'
            >
              {show ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className='bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className='text-white text-sm text-center mt-6'>Don't have an account? <Link to="/register"
          className='text-orange-500 font-semibold text-md'
        >Register</Link></p>
      </div>
    </div>
  )
}

export default Login