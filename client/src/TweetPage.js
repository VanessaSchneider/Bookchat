import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function TweetPage () {
    const [post, setPost] =useState("")
    const [user, setUser] = useState("")
    const { id } = useParams()
    const postData = {
        id:id
    }

    useEffect(() => {
        fetch('/me').then(response => {
          if (response.ok) {
            response.json().then(data => setUser(data))
          }
        })
      }, [])
    

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
<div className='post-container'>
          <Link to={`/users/${post.username}`}>{post.username}</Link>
        </div>
        {post.username ===user.username ? <button>Delete Post</button> : null}
</div>
</div>
    )
}

export default TweetPage;
