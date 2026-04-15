import React from 'react'
import Landing from '../components/Landing'

function Home() {
  return (
   // Removed h-[100vh] and bg-black (since App.jsx now handles the black background)
   <div className='w-full'>
      <Landing/>
   </div>
  )
}

export default Home