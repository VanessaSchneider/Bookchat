import { useEffect, useState } from "react";
function FeedPage(){

    const [posts, setPosts]=useState("")

    useEffect(() => {
              fetch("/posts")
          .then((res) => res.json())
          .then((data) => setPosts(data))}, 
          [])
      




return(


<div>
    Hello from the feedpage
</div>




)





}

export default FeedPage;