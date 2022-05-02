import { useEffect, useState } from 'react'

function MakePost ({ handleAddPost }) {
  const [content, setContent] = useState('')
  const [makePostIsHidden, setMakePostIsHidden] = useState(false)
  const [user, setUser] = useState('')
  const [show, setShow] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/me').then(response => {
      if (response.ok) {
        response.json().then(data => setUser(data))
      }
    })
  }, [])

  if (user) {
    console.log(user.username)
  }

  function handlePost (event) {
    setContent(event.target.value)
  }

  function handleShow (event) {
    setSearch(event.target.value)
  }

  function handleSearch (e) {
    e.preventDefault()
    const searchData = { name: search }
    fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchData)
    })
      .then(r => r.json())
      .then(show => setShow(show))
  }

  function handleSubmit (e) {
    e.preventDefault()
    const formData = {
      content: content,
      show_id: show.id,
      user_id: user.id,
      username: user.username
    }

    console.log(formData)
    fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(newPost => handleAddPost(newPost))
  }

  function handleWritePostClick () {
    setMakePostIsHidden(makePostIsHidden => !makePostIsHidden)
  }

  return (
    <>
      {makePostIsHidden ? (
        <div>
          <form onSubmit={handleSearch}>
            <input
              className='post-size'
              type='text'
              placeholder='Search for a show'
              onChange={handleShow}
              value={search}
            />
            <button className='button' type='submit'>
              Submit
            </button>
          </form>

          <form onSubmit={handleSubmit}>
            <input
              className='post-size'
              type='text'
              placeholder='Write your post'
              onChange={handlePost}
              value={content}
            />
            <button className='button' type='submit'>
              Submit
            </button>
          </form>
        </div>
      ) : null}
      <button className='button' onClick={handleWritePostClick}>
        {' '}
        {makePostIsHidden ? 'Hide Post Field' : 'Write a Post'}{' '}
      </button>
    </>
  )
}
export default MakePost
