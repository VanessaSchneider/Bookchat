import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function TweetPage ({posts}) {
    const [post, setPost] =useState("")
    const { id } = useParams()
    const postData = {
        id:id
    }
    useEffect(() => {
        fetch('/getpost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })
          .then(r => r.json())
          .then(post => setPost(post))
      }, [])
    



console.log(post)
console.log(id)
console.log(post.content)
    return(
<div>
    <br></br>
    <br></br>
<div className='post-container'>
{post.content}
<br></br>
{post.username}
</div>
</div>
    )
}

export default TweetPage;
