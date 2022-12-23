import React from 'react'
import NavBar from '../components/navBar'
import Annoucement from '../components/annoucement'
import Slider from '../components/slide'
import Categories from '../components/categories'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Annoucement></Annoucement>
        <NavBar/>
        <Slider/>
        <Categories/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home