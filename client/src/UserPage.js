import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';

function UserPage(){
const { username }  = useParams();
const [user, setUser] =useState("")
const searchData =

{username: username}



useEffect(() => {
    fetch('/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchData)
      })
        .then(r => r.json())
        .then(user => setUser(user))}, 
        [])

let post = []
if (user.posts && user.posts.length !==0) {
post = user.posts.map((post)=><div>
    {post.content}


    <Link
        to={`/shows/${post.show_name}`}
        >
              {post.show_name}
        </Link>

</div>)
}


return (
<div>
    <div className = "user-feed-container">
        <img className = "user-feed-image" src = {user.photo}></img>
        <div></div>
        {user.username}
        <br></br>
        {user.bio}
        </div>
        <div className = "user-feed-container">
         {post} 
         </div> 


    </div>
)



}

export default UserPage;