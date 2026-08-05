import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'
import AboutPage from './pages/AboutPage'
import ReturnPolicyPage from './pages/ReturnPolicyPage'
import DisclaimerPage from './pages/DisclaimerPage'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import OrderSuccess from './pages/OrderSuccess'
import Profile from './pages/Profile'
import AdminAnalytics from './pages/AdminAnalytics'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/return" element={<ReturnPolicyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/verify-otp" element={<VerifyOtp/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/check-out" element={<CheckOut/>} />
        <Route path="/order-success" element={<OrderSuccess/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/admin" element={<AdminAnalytics/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App