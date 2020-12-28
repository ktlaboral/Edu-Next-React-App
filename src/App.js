import React, {useState} from 'react';
import Home from "./pages/Home"
import NavBars from "./components/NavBars"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./App.scss"
import users from "./json/users.json"

            


function App() {

  const subscriptions = ["free","basic","premium"]
  const[user,setUser] = useState(users)
  
  
  let changeSubscription = (e) => {
    setUser({...user, SUBSCRIPTION : e})
  }

  let changeEmail = (e) => {
    setUser({...user, user_email : e})
  }


  return (
   <Router>
      <NavBars subscription={user.SUBSCRIPTION}/> 

     <Switch>

      <Route path="/">
        <Home user={user}  changeEmail={changeEmail} changeSubscription={changeSubscription} subscriptions={subscriptions}/>
      </Route>

     </Switch>

   </Router>
  );
}

export default App;
