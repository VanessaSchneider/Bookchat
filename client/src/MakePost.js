import { useEffect, useState } from 'react'

function MakePost ({ handleAddPost }) {
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
      setMakeSecondPostHidden((makeSecondPostHidden)=>!makeSecondPostHidden)
      setMakeFirstPostIsHidden(makeFirstPostIsHidden => !makeFirstPostIsHidden)

  }

  function showSelected(){
    if (show) {return <h3>You are writing a post about the show, {show.name}</h3>}
}

  console.log("showname", show.name)

  function handleSubmit (e) {
    e.preventDefault()
    const formData = {
      content: content,
      show_id: show.id,
      user_id: user.id,
      username: user.username,
      show_name: show.name,
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
    setMakeFirstPostIsHidden(makeFirstPostIsHidden => !makeFirstPostIsHidden)
  }

  return (
    <>
    {showSelected()}
      {makeFirstPostIsHidden ? 
        <div>
          <form onSubmit={handleSearch}>
            <input
              className='post-size'
              type='text'
              placeholder='First search for the show'
              onChange={handleShow}
              value={search}
            />
            <button className='button' type='submit'>
              Submit
            </button>
          </form> </div>: null}

          {makeSecondPostHidden ? <form onSubmit={handleSubmit}>
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
        :null}
      <button className='button' onClick={handleWritePostClick}>
        {' '}
        {makeFirstPostIsHidden ? 'Hide Post Field' : 'Write a Post'}{' '}
      </button>
    </>
  )
}
export default MakePost
