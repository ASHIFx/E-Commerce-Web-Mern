import { Link } from 'react-router-dom';

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-orange-500/20 bg-zinc-900/80 p-8 shadow-[0_0_60px_10px_rgba(251,146,60,0.1)] sm:p-10 lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">Disclaimer</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Clear information, fair expectations, and reliable support.</h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          ShopNest provides this website and its information for general informational purposes. While we work hard to keep details accurate,
          product availability, pricing, and promotions may change from time to time.
        </p>

        <div className="mt-8 rounded-2xl border border-gray-800 bg-black/50 p-6">
          <h2 className="text-xl font-semibold text-white">Please note</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-400">
            <li>• Product images and descriptions are intended to be as accurate as possible, but slight variations may occur.</li>
            <li>• We are not liable for delays caused by shipping partners, weather, or unforeseen circumstances.</li>
            <li>• Promotions, offers, and inventory are subject to change without notice.</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-6">
          <h2 className="text-xl font-semibold text-white">Customer support</h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            For questions about orders, returns, or account concerns, please contact our support team. We are here to help and will respond as quickly as possible.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400">
            Back to Home
          </Link>
          <Link to="/about" className="rounded-full border border-orange-500/40 px-5 py-2.5 text-sm font-semibold text-orange-400 transition hover:border-orange-400 hover:text-orange-300">
            Learn About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
