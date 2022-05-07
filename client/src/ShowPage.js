
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ShowPage(){
    const { name}  = useParams();
    const [rating, setRating] = useState(null)
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
console.log(show.rating)

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
  <br>
  </br>
  <br></br>
<div className = "post-container">

<h2>{show.name}</h2>
<h4>Show rating based on users voting </h4>
<div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (show.rating) ? "on" : "off"}
            >
              <span>&#9733;</span>
            </button>
          );
        })}
      </div>




</div>
<br></br>
<div className = "post-container">
       {post}
       </div>

    </div>
)



}

export default ShowPage;