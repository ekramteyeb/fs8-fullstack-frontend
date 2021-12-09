import React from 'react'
// import { Switch, Route } from 'react-router-dom' // old
import { Routes as Switch, Route, Navigate } from 'react-router-dom' // updated to latest

//https://reactrouter.com/docs/en/v6/upgrading/v5
//https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom

import Home from './pages/Home/Home'
import Product from './pages/Products/Product'
import Products from './pages/Products/Products'
import LogIn from './pages/Login'
import Signup from './pages/Signup'
import EditProfile from './pages/EditProfile'


const Routes = () => (
  <>
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="*" element={<Navigate to ="/" />}/>
    </Switch>
  </>
)

export default Routes
