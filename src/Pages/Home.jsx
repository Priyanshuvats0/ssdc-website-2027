import React from 'react'
import Landing from '../components/Landing'
import LandingV2 from '../components/LandingV2'

function Home() {
  return (
   // Removed h-[100vh] and bg-black (since App.jsx now handles the black background)
   <div className='w-full'>
      {/* <Landing/> */}
      <LandingV2></LandingV2>
   </div>
  )
}

export default Home