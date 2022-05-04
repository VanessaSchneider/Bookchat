import { useEffect, useState } from 'react'

function MakePost ({ handleAddPost, makePostDisplay, setMakePostDisplay }) {
  const [content, setContent] = useState('')
  const [makeFirstPostIsHidden, setMakeFirstPostIsHidden] = useState(false)
  const [makeSecondPostHidden, setMakeSecondPostHidden] = useState(false)
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
    setMakeSecondPostHidden(makeSecondPostHidden => !makeSecondPostHidden)
    setMakeFirstPostIsHidden(makeFirstPostIsHidden => !makeFirstPostIsHidden)
    setSearch("")
  }

  function showSelected () {
    if (
      (show && makeFirstPostIsHidden === true) ||
      makeSecondPostHidden === true
    ) {
      return <h3>You are writing a post about the show, {show.name}</h3>
    }
  }

  console.log('showname', show.name)

  function handleSubmit (e) {
    e.preventDefault()
    const formData = {
      content: content,
      show_id: show.id,
      user_id: user.id,
      username: user.username,
      show_name: show.name
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
      setMakePostDisplay(makePostDisplay=>!makePostDisplay)
      reset()
  }

  function handleWritePostClick () {
    setMakeFirstPostIsHidden(makeFirstPostIsHidden => !makeFirstPostIsHidden)
    setMakePostDisplay(makePostDisplay=>!makePostDisplay)
  }

  function buttonToShow () {
    if (makeFirstPostIsHidden === false && makeSecondPostHidden === false) {
      return <button onClick={handleWritePostClick}> Write a Post </button>
    } else if (
      makeFirstPostIsHidden === true &&
      makeSecondPostHidden === false
    ) {
      return (
        <button onClick={handleWritePostClick}> Don't Write a Post </button>
      )
    } else {
      return null
    }
  }

  function reset () {
    setMakeSecondPostHidden(makeSecondPostHidden => false)
    setMakeFirstPostIsHidden(makeFirstPostIsHidden => false)
    setShow("")
    setMakePostDisplay(makePostDisplay=>false)
  }

  return (
    <>
      {showSelected()}
      {makeFirstPostIsHidden ? (
        <div className = "submit-forms">
          <h2>Search for the movie you would like to post about</h2>
          <form onSubmit={handleSearch}>
            <input
              type='text'
              placeholder='Movie Name'
              onChange={handleShow}
              value={search}
            />
            <button className='button' type='submit'>
              Submit
            </button>
          </form>{' '}
        </div>
      ) : null}

      {makeSecondPostHidden ? (
        <div className = "submit-forms">
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
          <button onClick={reset}>Don't Make a Post </button>
        </div>
      ) : null}
      {buttonToShow()}

      {/* <button className='button' onClick={handleWritePostClick}>
        {makeFirstPostIsHidden && makeSecondPostHidden ===false
          ? "Don't Write a Post"
          : 'Write a Post'}
      </button> */}
    </>
  )
}
export default MakePost
