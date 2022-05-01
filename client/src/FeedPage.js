import { useEffect, useState } from "react";
function FeedPage({posts}){



          console.log("posts",posts)

          let post = []
          if (posts && posts.length!==0) {post = posts.map(post => <p>
              {post.content}
              {post.user_id}

          </p>)}
            

     
return(


<div>

    {post}

</div>




)





}

export default FeedPage;