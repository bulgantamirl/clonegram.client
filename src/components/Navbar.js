import React,{useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'


const Navbar =()=> {
  const {state, dispatch} = useContext(UserContext)
  const history = useHistory()

  const renderList = ()=>{
    if(state){
      return [
          <li><Link to="/profile">Profile</Link></li>,
          <li><Link to="/upload">Upload</Link></li>,
          <li>
            <button className="btn waves-effect waves-light #ec407a pink lighten-1"
                    onClick={()=>{
                      localStorage.clear()
                      dispatch({type:"CLEAR"})
                      history.push('/login')
                    }}
                >
                    Log Out
                </button>
          </li>

      ]
    }else{
      return [
          <li><Link to="/login">LogIn</Link></li>,
          <li><Link to="/signup">SignUp</Link></li>
      ]
    }
  }
  return (
    <div className="navbar-fixed">
      <nav>
          <div className="nav-wrapper white">
            
            <Link to={state?"/":"/login"} className="brand-logo left">Clonegram</Link>
            <img id="logo" src="https://res.cloudinary.com/bulgantamirl/image/upload/v1622725992/cloneGram_etd0v0.png" />
            <ul id="nav-mobile" className="right">
                {renderList()}
            </ul>
          </div>
      </nav>
    </div>
  )
}
export default Navbar