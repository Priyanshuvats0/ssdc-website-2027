import React from 'react'
import Navbar from '../components/Navbar'
import Landing from '../components/Landing'
import Footer from '../components/Footer'

function Home() {
    
  return (
   <div className='bg-black w-full h-[100vh]'>
      <Navbar/>
      <Landing/>
      <Footer/>
    
   </div>
  )
}

export default Home
