import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { register } from '../api/authApi';

const Register = () => {
  const [show, setShow] = useState(false);
  const [showc, setShowc] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register({ username, email, password });
      localStorage.setItem('pendingEmail', email);
      navigate('/verify-otp', { state: { email } });
    } catch (error) {
      if (error.response?.status === 409) {
        setError('An account with this email already exists');
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
    <div className='h-[95vh] flex justify-center items-center'>
      <div className='bg-zinc-900 rounded-2xl p-10 w-full max-w-md border border-white/5 shadow-2xl'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <h2 className='text-white text-2xl font-bold text-center mb-4'>Create Account</h2>

          {error && (
            <p className='bg-red-500/10 border border-red-500/30 text-red-500 text-sm text-center py-2 rounded-lg'>
              {error}
            </p>
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='bg-black text-white px-4 py-3 rounded-lg border border-zinc-700 focus:outline-none focus:border-orange-500'
          />

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

          <div className='relative'>
            <input
              type={showc ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full bg-black text-white px-4 py-3 rounded-lg border border-zinc-700 focus:outline-none focus:border-orange-500'
            />
            <button
              type="button"
              onClick={() => setShowc(!showc)}
              className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400'
            >
              {showc ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className='bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className='text-white text-sm text-center mt-6'>
          Already have an account? <Link to="/login" className='text-orange-500 font-semibold text-md'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register