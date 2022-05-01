import { useEffect, useState } from "react";
function FeedPage(){

    const [posts, setPosts]=useState([])

    useEffect(() => {
              fetch("/posts")
          .then((res) => res.json())
          .then((data) => setPosts(data))}, 
          [])

          console.log("posts",posts)

          let post = []
          post = posts.map(post => <p>
              {post.content}
              {post.user_id}

          </p>)
            

     
return(


<div>

    {post}

</div>




)





}

export default FeedPage;