import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AddFriend from './AddFriend.js'

function UserPage () {
  const { username } = useParams()
  const [user, setUser] = useState('')
  const searchData = { username: username }

  useEffect(() => {
    fetch('/getuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchData)
    })
      .then(r => r.json())
      .then(user => setUser(user))
  }, [])

  let post = []
  if (user.posts && user.posts.length !== 0) {
    post = user.posts.map(post => (
      <div>
        <div className='post-container'>
          <Link to={`/shows/${post.show_name}`}>#{post.show_name}</Link>
        </div>
        <div className='post-container-plus'>
          <Link to={`/posts/${post.id}`}>
            <button className='button2'>{post.content}</button>
          </Link>
        </div>
        <div className='post-container'>
          <Link to={`/posts/${post.id}`}>
            <button className='button2'>See Comments</button>
          </Link>
        </div>
      </div>
    ))
  }

  return (
    <div>
      {/* <AddFriend user={user}/> */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className='post-container'>
        <img className='user-feed-image' src={user.photo}></img>
      </div>
      <div className='post-container'>{user.username}</div>
      <div className='post-container'>{user.bio}</div>
      <br></br>

      <div className='post-container-plus'>{post}</div>
    </div>
  )
}

export default UserPage
