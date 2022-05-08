import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function FeedPage ({ posts, users }) {
  const [showComments, setShowComments] = useState(false)
  const [commentForm, setCommentForm] = useState(false)

  function ShowTheComments () {
    setShowComments(showComments => !showComments)
  }
  function showCommentForm () {
    setCommentForm(commentForm => !commentForm)
  }

  let post = []
  if (posts && posts.length !== 0) {
    post = posts.map(post => (
      <div key = {post.id}>
        <div className='user-feed-container'>
          {post.user.photo ? (
            <div>
              <img className='feedSize' src={post.user.photo}></img>{' '}
            </div>
          ) : null}

          <div className='username'>
            <Link to={`/users/${post.user.username}`}>
              {post.user.username}
            </Link>
          </div>
          <div className='post-space'>
            <Link to={`/posts/${post.id}`}>
              <button className='button2'>{post.content}</button>
            </Link>
          </div>
          <div className='writepost'>
            <button onClick={showCommentForm}>Comment on Post</button>
          </div>
          <div className='post-container2'>
            <Link to={`/shows/${post.show.name}`}>#{post.show.name}</Link>
          </div>
          <div className='post-container'>
          <Link to={`/posts/${post.id}`}>
              <button className='button2'>See Comments</button>
            </Link>
          </div>
          
     
        </div>
      </div>
    ))
  } else {
    null
  }
  console.log(commentForm)
  return (
    <div className='user-feed-container'>
      <div className='user-feed-container'>{post}</div>
    </div>
  )
}

export default FeedPage
