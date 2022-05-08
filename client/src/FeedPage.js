import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function FeedPage ({ posts, users }) {
  console.log('users', users)
  let post = []
  if (posts && posts.length !== 0) {
    post = posts.map(post => (
      <div>
        <div className='user-feed-container'>
          {post.user.photo ? (
            <div>
            <img className='feedSize' src={post.user.photo}></img> </div>
          ) : null}
     
        <div className ="username">
          <Link to={`/users/${post.user.username}`}>{post.user.username}</Link>
        </div>
        <div className='post-space'>
        <Link to={`/posts/${post.id}`}>
          <button className = "button2"
          >{post.content}</button>
                </Link>
          </div>
        <div className='post-container'>
          <Link to={`/shows/${post.show.name}`}>#{post.show.name}</Link>
        </div>
        </div>
      </div>
    ))
  } else {
    null
  }

  return <div className ='user-feed-container'>{post}</div>
}

export default FeedPage
