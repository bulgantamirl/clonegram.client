
import React,{useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from './components/Navbar'
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import "./App.css"
import Home from './components/screens/Home'
import Signup from './components/screens/Signup'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import Upload from './components/screens/Upload'
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=> {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    
    if(user) {
      dispatch({type:"USER", payload:user})
    }
    else {
      history.push('/login')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/upload">
        <Upload />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar />
          <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
