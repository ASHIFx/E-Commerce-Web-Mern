import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="border-t border-gray-800 bg-black/90">
      <div className="mx-4 my-8 flex flex-col gap-6 text-sm text-gray-400 sm:mx-8 md:mx-20 md:flex-row md:items-start md:justify-between lg:mx-24">
        <div className="max-w-xs">
          <h1 className="mb-2 text-xl font-bold text-orange-500">ShopNest</h1>
          <p className="leading-7">Premium e-commerce experiences crafted for modern buyers who value style, speed, and trust.</p>
        </div>

        <ul className="flex flex-wrap gap-4 md:gap-6">
          <li><Link to='/about' className="transition hover:text-orange-400">About Us</Link></li>
          <li><Link to='/return' className="transition hover:text-orange-400">Return Policy</Link></li>
          <li><Link to='/disclaimer' className="transition hover:text-orange-400">Disclaimer</Link></li>
        </ul>

        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ShopNest. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer