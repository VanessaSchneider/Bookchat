import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ShowPage ({ users }) {
  const { name } = useParams()
  const [rating, setRating] = useState(null)
  const [show, setShow] = useState('')
  const searchData = {
    name: name
  }

  useEffect(() => {
    fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchData)
    })
      .then(r => r.json())
      .then(show => setShow(show))
  }, [])
  let post = []

  if (show.posts && show.posts.length !== 0) {
    post = show.posts.map(post => (
      <div>
        <div className='post-container'>
          <Link to={`/users/${post.username}`}>{post.username}</Link>
        </div>
        <div className='post-container-plus'>
          <Link to={`/posts/${post.id}`}>
            <button className='button2'>{post.content}</button>
          </Link>
          <div className='post-container'>
            <Link to={`/posts/${post.id}`}>
              <button className='button2'>See Comments</button>
            </Link>
          </div>
          <br></br>
        </div>
      </div>
    ))
  }

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <div className='post-container'>
        <h2 className='post-container'>{show.name}</h2>
        <h3 className='author-container'>{show.author}</h3>
        <img img className='book-size' src={show.photo}></img>
        <h4 className='post-container'>Rating based on users voting </h4>
        <div className='post-container'>
          <div className='star-rating'>
            {[...Array(5)].map((star, index) => {
              index += 1
              return (
                <button
                  type='button'
                  key={index}
                  className={index <= show.rating ? 'on' : 'off'}
                >
                  <span>&#9733;</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <br></br>
      <div className='post-container'>{post}</div>
    </div>
  )
}

export default ShowPage
