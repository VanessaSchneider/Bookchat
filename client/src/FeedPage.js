import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function FeedPage({posts, users}){





          console.log("users", users)
            let post = []
          if (posts && posts.length!==0) {post = posts.map(post =><div> 
            <img src = {post.user.photo}></img>
             {post.user.username}
             <br></br>
              {post.content}
             
           
        
           



              {/* <Link to={`users/${post.user_id}`}>
                     <div className="post-username-link">{post.user_id.user} </div>
                    </Link> */}

      
          </div>)}
          else {return null}
            

     
return(


<div>

    {post}

</div>




)





}

export default FeedPage;