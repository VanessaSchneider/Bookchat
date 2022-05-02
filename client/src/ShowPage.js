
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
show.posts.map((post)=> <div>

    {post.content}
   
  
  

    <Link
        to={`/users/${post.username}`}
        >
              {post.username}
        </Link>




</div>
)}



return (



    <div>

{show.name}

       {post}

    </div>
)



}

export default ShowPage;