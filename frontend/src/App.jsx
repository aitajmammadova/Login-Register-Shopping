import { use, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ProductForm from './pages/ProductForm'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'

function App() {
  const location=useLocation()

  return (
    <>
      {location !== '/not found' && <Header/>}
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<ProductForm/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
      {location !== "/not-found" && <Footer />}

    </>
  )
}

export default App
