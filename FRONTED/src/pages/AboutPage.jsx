import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-orange-500/20 bg-zinc-900/80 p-8 shadow-[0_0_60px_10px_rgba(251,146,60,0.1)] sm:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">About ShopNest</p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Built for modern shoppers who value trust, speed, and quality.</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              ShopNest is a premium e-commerce experience designed to help customers discover products with confidence.
              We blend clean design, dependable service, and carefully curated products into one effortless shopping journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/" className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400">
                Explore Products
              </Link>
              <Link to="/return" className="rounded-full border border-orange-500/40 px-5 py-2.5 text-sm font-semibold text-orange-400 transition hover:border-orange-400 hover:text-orange-300">
                View Return Policy
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-black/60 p-6">
            <h2 className="text-xl font-semibold text-white">Why customers choose us</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500" />Secure checkout and transparent pricing.</li>
              <li className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500" />Fast delivery and dependable support.</li>
              <li className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500" />Simple returns and clear policies.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 bg-black/50 p-6">
            <h3 className="text-lg font-semibold text-white">Our Mission</h3>
            <p className="mt-2 text-sm leading-7 text-gray-400">To create a trusted online shopping experience that feels premium, intuitive, and easy to enjoy.</p>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-black/50 p-6">
            <h3 className="text-lg font-semibold text-white">Our Promise</h3>
            <p className="mt-2 text-sm leading-7 text-gray-400">Every purchase is backed by attentive service and transparent communication from start to finish.</p>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-black/50 p-6">
            <h3 className="text-lg font-semibold text-white">Our Focus</h3>
            <p className="mt-2 text-sm leading-7 text-gray-400">Quality products, thoughtful packaging, and a smooth experience that keeps customers coming back.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
