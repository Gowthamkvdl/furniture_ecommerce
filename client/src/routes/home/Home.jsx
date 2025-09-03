import React from 'react'
import Landing from '../../components/home/landing/Landing'
import Categories from '../../components/home/categories/Categories'
import Contact from '../../components/home/contact/Contact'
import Testimonial from '../../components/home/testimonial/Testimonial'
import TopBanner from '../../components/topBanner/TopBanner'

const Home = () => {
  return (
    <div className='' >
      <TopBanner />
      <Landing />
      <Categories />
      <Contact />
      <Testimonial />
    </div>
  )
}

export default Home