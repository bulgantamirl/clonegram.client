import React,{useState,useEffect} from 'react';

const Home =()=>{
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
    },[])

    const likePost = (id)=> {
        fetch('/like',{
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result=> {
            console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else {
                    return item
                }    
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text, postId)=>{
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId: postId,
                text:text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else {
                    return item
                }    
            })
            setData(newData) 
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className="card homeCard" key={item._id}>
                            <h6 className="photoUserName">{item.postedBy.name}</h6>
                            <div className="card-image">
                                <img src={item.photo} 
                                />
                            </div>
                            <div className="card-content">
                            
                            <h6 className="likes"><i className="material-icons" style={{color:"#ec407a"}}
                            onClick={()=> {likePost(item._id)}}>favorite</i>
                            &nbsp; {item.likes.length} likes </h6>
                             
                            <div> <h6>{item.postedBy.name}</h6><span> {item.title}</span></div>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return ( <>
                                            <h6 style={{fontSize: "1.1em"}} key={record._id}> <br/> {record.postedBy.name}</h6>&nbsp;<span>{record.text}</span>
                                            </>
                                        )                                            
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault() 
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input id="commentSec" type="text" placeholder="add a comment" />
 
                                </form>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )
}
export default Home