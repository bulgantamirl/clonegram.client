import React, {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'
import {UserContext} from '../../App'

const Login =()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword] =useState("")
    const [email,setEmail] =useState("")
    const PostData = ()=>{
        fetch("/login",{
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error) {
                M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html:"Logged in succesfully", classes:"#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2 className="brand-logo">Clonegram</h2>
                <input type="text" placeholder="Email"
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password"
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                /> 
                <button className="btn waves-effect waves-light #ec407a pink lighten-1"
                    onClick={()=>PostData()}
                >
                    Log In
                </button>
                <br />
                <h6>
                    <Link to="/signup">Don't have an account?</Link>
                </h6>
            </div>
        </div>
    )
}
export default Login