import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { verifyOtp } from '../api/authApi';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const email = location.state?.email || localStorage.getItem('pendingEmail');

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  const maskEmail = (email) => {
    if (!email) return "";

    const [name, domain] = email.split("@");
    return `${name.slice(0, 1)}*****@${domain}`;
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    if (otp.join("").length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const code = otp.join("");
      const res = await verifyOtp({ email, otp: code });
      localStorage.removeItem('pendingEmail');
      authLogin(res.data);
      navigate('/');
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!email) return null;
  if (loading) return <Loading />

  return (
    <div className='h-[75vh] text-white flex justify-center items-start'>
      <div className='bg-zinc-900 rounded-2xl max-w-md w-full border border-white/5 p-10 shadow-2xl m-10'>
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 py-2 text-center text-sm text-red-400">
              {error}
            </p>
          )}
          <h2 className='text-2xl font-semibold my-2'>Verify Your account</h2>
          <p className='text-sm opacity-70 mt-2'>We sent a 6 digit code to {maskEmail(email)}</p>
          <div className="flex justify-center gap-3">
            {otp.map((_, index) => (<input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onChange={(e) => handleChange(e.target.value, index)}
              className='my-9 border border-zinc-700 rounded-xl bg-black text-white text-center w-14 h-14 text-2xl font-bold outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 focus:scale-105'
            />))}
          </div>
          <button
            type="submit"
            className="mt-5 bg-orange-500 text-white py-3 w-full px-8 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerifyOtp