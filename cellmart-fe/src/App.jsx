import Hero from './components/Hero'
import Navigation from './components/Navigation'
import MobileListing from './components/MobileListing'
import AccessoriesListing from './components/AccessoriesListing'
import Testimonials from './components/Testimonials'
import Footer from './components/footer'
import ExploreGrid from './components/ExploreGrid'

function App() {

  return (
    <>
    <Navigation/>
    <div className="relative min-h-screen">
    <img
        src="/assets/hero/image.png"
        alt=""
        className=" absolute top-0 w-full h-full object-cover"
        />
    <Hero/>
    </div>
    <MobileListing/> 
    <AccessoriesListing/>
    <ExploreGrid/>
    <Testimonials/> 
    <Footer/>

    </>
  )
}

export default App