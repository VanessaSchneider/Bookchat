import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

function CommentPage ({ handleDeleteComment }) {
  const [user, setUser] = useState('')
  const [comment, setComment] = useState('')
  const history = useHistory()
  const { id } = useParams()
  const commentData = {
    id: id
  }

  useEffect(() => {
    fetch('/me').then(response => {
      if (response.ok) {
        response.json().then(data => setUser(data))
      }
    })
  }, [])

  useEffect(() => {
    fetch('/getcomment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
      .then(r => r.json())
      .then(comment => setComment(comment))
  }, [])

  function handleDelete () {
    fetch(`/comments/${comment.id}`, {
      method: 'DELETE'
    }).then(() => console.log('deleted!'))
    handleDeleteComment(comment.id)
    toDelete(comment.id)

    alert('You have deleted the comment')
  }

  const handleReroute = () => {
    console.log('Reroute!')
    history.push('/')
  }

  function toDelete (id) {
    setComment(null)
    handleReroute()
  }

  return (
    <div>
      {comment ? (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <div className='post-container'>
            <Link to={`/users/${comment.username}`}>{comment.username}</Link>
          </div>
          <div className='post-container'>{comment.content}</div>
        </div>
      ) : null}
      {comment.username === user.username ? (
        <div className = "comment-delete">
        <button onClick={handleDelete} className='delete-post'>
          Delete Comment
        </button> </div>
      ) : null}
    </div>
  )
}

export default CommentPage
