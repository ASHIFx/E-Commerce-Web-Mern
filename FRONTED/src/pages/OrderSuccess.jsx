import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  return (
    <div className='max-w-4xl mx-auto px-4 py-16'>
      <div className='rounded-4xl bg-zinc-950 border border-white/10 p-10 shadow-2xl'>
        <div className='mb-8 text-center'>
          <p className='inline-flex rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300'>Order complete</p>
          <h1 className='mt-6 text-4xl font-bold text-white'>Thank you for your purchase!</h1>
          <p className='mt-4 max-w-2xl mx-auto text-zinc-400'>Your order has been placed successfully. We&#8217;re preparing it for shipment and will email you confirmation shortly.</p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2'>
          <div className='rounded-3xl border border-white/10 bg-zinc-900 p-6'>
            <h2 className='text-lg font-semibold text-white mb-3'>Order details</h2>
            <p className='text-sm text-zinc-400'>Order ID</p>
            <p className='break-all text-lg font-medium text-white'>{orderId ?? 'Unavailable'}</p>
          </div>
          <div className='rounded-3xl border border-white/10 bg-zinc-900 p-6'>
            <h2 className='text-lg font-semibold text-white mb-3'>What happens next</h2>
            <ul className='space-y-3 text-zinc-400'>
              <li>• You will receive an email confirmation with shipping details.</li>
              <li>• Your account order history has been updated.</li>
              <li>• We&#39;ll notify you when your order ships.</li>
            </ul>
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center'>
          <button
            onClick={() => navigate('/')}
            className='rounded-2xl bg-orange-500 px-6 py-4 text-white font-semibold transition hover:bg-orange-600'
          >
            Continue shopping
          </button>
          <button
            onClick={() => navigate('/shop')}
            className='rounded-2xl border border-zinc-800 bg-transparent px-6 py-4 text-white font-semibold transition hover:border-orange-500'
          >
            View catalogue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
