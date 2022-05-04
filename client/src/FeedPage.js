import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function FeedPage ({ posts, users }) {




  console.log('users', users)
  let post = []
  if (posts && posts.length !== 0) {
    post = posts.map(post => (
      <div>
        <div className='post-container'>
          {post.user.photo ? (
            <img className='feedSize' src={post.user.photo}></img>
          ) : null}
        </div>
        <div className='post-container'>
          <Link to={`/users/${post.user.username}`}>{post.user.username}</Link>
        </div>
        <div className='post-container-plus'>{post.content}</div>
        <div className='post-container'>
          <Link to={`/shows/${post.show.name}`}>#{post.show.name}</Link>
          <br></br>
          <br></br>
          <br></br>
        </div>
       
      </div>
    ))
  } else {
    return null
  }

  return <div>{post}</div>
}

export default FeedPage
