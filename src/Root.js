import React from 'react'
import {BrowserRouter, Route, Switch} from  'react-router-dom'
import App from './App'
import Login from './components/OAuth/Login'
import Raffle from './components/Raffle/Raffle'

const Root = () => {

  const [token, setToken] = React.useState('')
  const [raffle, SetRaffle] = React.useState('china')

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route  exact path="/" 
                render={(props) => <App SetRaffle={SetRaffle} {...props}/>}/>
        <Route  path="/login" 
                render={(props) => <Login raffle={raffle} setToken={setToken} {...props}/>}/>
        <Route  path="/raffle/:category"
                render={(props) => <Raffle token={token} {...props}/>}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Root
