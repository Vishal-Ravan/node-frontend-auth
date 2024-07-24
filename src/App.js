import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Refresh from './pages/Refresh'

const App = () => {
const [isAuth, setIsAuth]= useState(false)
  const PrivateRoute =({element})=>{
    return isAuth ? element :<Navigate to="/login"/>
  }
  return (
 <>
  <Refresh setIsAuth={setIsAuth}/>
 <Routes>
<Route path='/login' element= {<Login/>}/>
<Route path='/' element= {<Signup/>}/>
<Route path='/home' element= {<PrivateRoute element={<Home/>}/>}/>
  
 </Routes>
 
 </>
  )
}

export default App