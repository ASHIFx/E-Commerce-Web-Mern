import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getProfile } from '../api/authApi';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await getProfile();
        setProfile(res.data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='max-w-4xl mx-auto px-4 py-16'>
      <div className='rounded-3xl bg-zinc-950 p-10 shadow-2xl border border-white/10'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white'>My Profile</h1>
          <p className='text-zinc-400 mt-2'>Manage your account details and view your registered information.</p>
        </div>

        {loading ? (
          <p className='text-zinc-400'>Loading profile...</p>
        ) : error ? (
          <div className='rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-red-200'>
            {error}
          </div>
        ) : profile ? (
          <div className='grid gap-6 lg:grid-cols-[1fr_1fr]'>
            <div className='rounded-3xl bg-zinc-900 p-6 border border-white/10'>
              <h2 className='text-xl font-semibold text-white mb-4'>Account information</h2>
              <div className='space-y-4 text-zinc-300'>
                <div>
                  <p className='text-sm text-zinc-500'>Username</p>
                  <p className='text-lg font-medium'>{profile.username}</p>
                </div>
                <div>
                  <p className='text-sm text-zinc-500'>Email</p>
                  <p className='text-lg font-medium'>{profile.email}</p>
                </div>
                <div>
                  <p className='text-sm text-zinc-500'>Role</p>
                  <p className='text-lg font-medium'>{profile.role || 'user'}</p>
                </div>
                <div>
                  <p className='text-sm text-zinc-500'>Verified</p>
                  <p className='text-lg font-medium'>{profile.isVerified ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>

            <div className='rounded-3xl bg-zinc-900 p-6 border border-white/10'>
              <h2 className='text-xl font-semibold text-white mb-4'>Account details</h2>
              <div className='space-y-4 text-zinc-300'>
                <div>
                  <p className='text-sm text-zinc-500'>Joined</p>
                  <p className='text-lg font-medium'>{new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className='text-sm text-zinc-500'>Last updated</p>
                  <p className='text-lg font-medium'>{new Date(profile.updatedAt).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className='w-full rounded-2xl bg-orange-500 px-6 py-3 text-white font-semibold transition hover:bg-orange-600'
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className='text-zinc-400'>No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
