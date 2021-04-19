import React from 'react'
import {BrowserRouter, Route} from  'react-router-dom'
import App from './App'
import Login from './components/OAuth/login'
import Raffle from './components/Raffle/Raffle'

const Root = () => {

  const [authCode, setAuthCode] = React.useState('')

  return (
    <BrowserRouter>
      <Route  exact path="/" 
              render={(props) => <App {...props}/>}/>
      <Route  path="/login" 
              render={(props) => <Login setAuthCode={setAuthCode} {...props}/>}/>
      <Route  path="/raffle/:category"
              render={(props) => <Raffle authCode={authCode} {...props}/>}/>
    </BrowserRouter>
  )
}

export default Root
