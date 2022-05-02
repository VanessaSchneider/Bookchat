
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ShowPage(){
    const { name}  = useParams();
    const [show, setShow] =useState("")
    const searchData = {
        name: name

    }

    useEffect(() => {
    fetch('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchData)
      })
        .then(r => r.json())
        .then(show => setShow(show))}, 
        [])

console.log(show.posts)

let post = []
if (show.posts && show.posts.length !==0){post =
show.posts.map((post)=> <div> <div className = "post-container">
 <Link
        to={`/users/${post.username}`}
        >
              {post.username}
        </Link>
    </div>
   
  
  
    <div className = "post-container">
    {post.content}

        </div>
<br></br>
</div>
)}



return (


<div>
<div className = "post-container">

{show.name}
</div>
<br></br>
<div className = "post-container">
       {post}
       </div>

    </div>
)



}

export default ShowPage;