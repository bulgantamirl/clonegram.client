import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'

const Signup =()=>{
    const history = useHistory()
    const [name,setName] =useState("")
    const [password,setPassword] =useState("")
    const [email,setEmail] =useState("")
    const PostData = ()=>{
        fetch("/signup",{
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error) {
                M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
            }
            else{
                M.toast({html:data.message, classes:"#43a047 green darken-1"})
                history.push('/login')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2 className="brand-logo">Clonegram</h2>
                <input type="text" placeholder="Name" 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                />
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
                    Sign Up
                </button>
                <br/>
                <h6>
                    <Link to="/login">Already have an account?</Link>
                </h6>
            </div>
        </div>
    )
}
export default Signup