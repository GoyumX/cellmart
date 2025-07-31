import Hero from '@/components/Hero'
import MobileListing from '@/components/MobileListing'
import AccessoriesListing from '@/components/AccessoriesListing'
import Testimonials from '@/components/Testimonials'
import ExploreGrid from '@/components/ExploreGrid'

const HomePage = () => {

    return (
      <>
      <div className="relative min-h-screen overflow-hidden">
        <img
          src="/assets/hero/image.png"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <Hero/>
      </div>
      <MobileListing/> 
      <AccessoriesListing/>
      <ExploreGrid/>
      <Testimonials/> 
      </>
    )
  }
  
export default HomePage