import { useEffect, useState } from 'react';
import api from '../api/axios';

const STATUS_OPTIONS = ['Pending', 'Shipped', 'Delivered'];

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdateError, setStatusUpdateError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [analyticsRes, ordersRes] = await Promise.all([
          api.get('/analytics'),
          api.get('/orders'),
        ]);

        setStats(analyticsRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setStatusUpdateError('');

    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((current) =>
        current.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (err) {
      setStatusUpdateError(err.response?.data?.message || 'Unable to update order status');
    }
  };

  if (loading) return <div className='text-white p-10'>Loading analytics...</div>;
  if (error) return <div className='text-red-400 p-10'>{error}</div>;

  return (
    <div className='max-w-6xl mx-auto px-4 py-16'>
      <div className='rounded-3xl bg-zinc-950 p-10 shadow-2xl border border-white/10 mb-10'>
        <h1 className='text-4xl text-white font-bold mb-6'>Admin Dashboard</h1>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='rounded-3xl bg-zinc-900 p-6 border border-white/10'>
            <p className='text-sm uppercase text-zinc-500'>Users</p>
            <p className='mt-3 text-3xl font-semibold text-white'>{stats.totalUsers}</p>
          </div>
          <div className='rounded-3xl bg-zinc-900 p-6 border border-white/10'>
            <p className='text-sm uppercase text-zinc-500'>Products</p>
            <p className='mt-3 text-3xl font-semibold text-white'>{stats.totalProducts}</p>
          </div>
          <div className='rounded-3xl bg-zinc-900 p-6 border border-white/10'>
            <p className='text-sm uppercase text-zinc-500'>Orders</p>
            <p className='mt-3 text-3xl font-semibold text-white'>{stats.totalOrders}</p>
          </div>
          <div className='rounded-3xl bg-zinc-900 p-6 border border-white/10'>
            <p className='text-sm uppercase text-zinc-500'>Revenue</p>
            <p className='mt-3 text-3xl font-semibold text-white'>₹{stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className='rounded-3xl bg-zinc-950 p-10 shadow-2xl border border-white/10'>
        <div className='flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-3xl font-bold text-white'>Orders</h2>
          <p className='text-sm text-zinc-400'>Manage order statuses from here.</p>
        </div>

        {statusUpdateError && (
          <div className='rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-red-200 mb-6'>
            {statusUpdateError}
          </div>
        )}

        <div className='overflow-hidden rounded-3xl border border-white/10'>
          <div className='grid grid-cols-5 gap-4 bg-zinc-900 p-4 text-zinc-400 text-sm uppercase font-semibold'>
            <span>Order ID</span>
            <span>User</span>
            <span>Items</span>
            <span>Total</span>
            <span>Status</span>
          </div>
          {orders.length === 0 ? (
            <div className='p-8 text-center text-zinc-400'>No orders found.</div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className='grid grid-cols-5 gap-4 border-t border-white/10 bg-zinc-950 p-4 items-center text-white text-sm'
              >
                <span className='truncate'>{order._id}</span>
                <span>{order.userId?.username || 'Unknown'}</span>
                <span>{order.items?.length ?? 0}</span>
                <span>₹{order.totalAmount.toFixed(2)}</span>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className='w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-orange-500'
                >
                  {STATUS_OPTIONS.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
