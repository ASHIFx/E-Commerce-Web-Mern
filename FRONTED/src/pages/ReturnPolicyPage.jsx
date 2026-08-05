import { Link } from 'react-router-dom';

const ReturnPolicyPage = () => {
  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-orange-500/20 bg-zinc-900/80 p-8 shadow-[0_0_60px_10px_rgba(251,146,60,0.1)] sm:p-10 lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">Return Policy</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Hassle-free returns for your peace of mind.</h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          We want every customer to feel confident while shopping with ShopNest. If you are not completely satisfied with your purchase,
          we offer a simple return process within the stated window.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-800 bg-black/50 p-6">
            <h2 className="text-xl font-semibold text-white">Eligibility</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-400">
              <li>• Items must be returned within 7 days of delivery.</li>
              <li>• Products should be unused, unworn, and in original packaging.</li>
              <li>• Proof of purchase is required for all return requests.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-black/50 p-6">
            <h2 className="text-xl font-semibold text-white">How it works</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-400">
              <li>• Contact our support team with your order details.</li>
              <li>• We confirm eligibility and share return instructions.</li>
              <li>• Refunds are processed after the return is inspected.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-6">
          <h2 className="text-xl font-semibold text-white">Important Notes</h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            Some items such as personalized goods, opened electronics, and sale products may be excluded from returns.
            For full details, please contact our support team before sending your item back.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400">
            Back to Home
          </Link>
          <Link to="/disclaimer" className="rounded-full border border-orange-500/40 px-5 py-2.5 text-sm font-semibold text-orange-400 transition hover:border-orange-400 hover:text-orange-300">
            Read Disclaimer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
