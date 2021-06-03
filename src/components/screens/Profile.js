import React,{useEffect,useState, useContext} from 'react';
import {UserContext} from '../../App'

const Profile =()=>{
    const [mypics, setPics] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
                
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])
    return(
        <div className="profilePage">
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey",
                alignItems:"start"
            }}>
                <div>
                <img id="profilePic" style={{width:"160px", height:"160px", borderRadius:"80px"}}
                src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                />
                </div>
                <div>
                    <h5 id="profileName">{state?state.name:"loading"} </h5>
                </div>
            </div>
            <div className="gallery">
                    {
                        mypics.map(item=>{
                            return(
                                <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                                
                            )
                        })
                    }

            </div>
        </div>
    )
}
export default Profile