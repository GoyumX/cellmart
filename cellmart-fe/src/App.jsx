import Hero from './components/Hero'
import Navigation from './components/Navigation'
import MobileListing from './components/MobileListing'
import Testimonials from './components/Testimonials'
import Footer from './components/footer'

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
    <Testimonials/>
    <Footer/>

    </>
  )
}

export default App
