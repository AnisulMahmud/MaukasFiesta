import { useState } from 'react'
import reactLogo from './assets/first.png'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'

function App() {
 

  return (
    <>
      <div className='App'>
      <NavBar />

      <div className='content'>
        <Home />
      </div>
      </div>
       
    </>
  )
}

export default App
