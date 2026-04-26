import Navbar          from './components/Navbar'
import Hero             from './components/Hero'
import ProductCategories from './components/ProductCategories'
import Performance      from './components/Performance'
import WhatsIncluded    from './components/WhatsIncluded'
import Reviews          from './components/Reviews'
import Footer           from './components/Footer'
import PurchasePopup    from './components/PurchasePopup'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#020204] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProductCategories />
      <Performance />
      <WhatsIncluded />
      <Reviews />
      <Footer />
      <PurchasePopup />
    </div>
  )
}
