import React from 'react'
import {BrowserRouter, Route} from  'react-router-dom'
import App from './App'
import Login from './components/OAuth/login'

const Root = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={App}/>
      <Route path="/login" component={Login}/>
    </BrowserRouter>
  )
}

export default Root
