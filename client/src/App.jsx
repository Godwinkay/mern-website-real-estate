import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div>
      <Router>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </Router> 
    </div>
  )
}
