import { useEffect, useState } from 'react'
import StarRating from './StarRating'
import { useHistory, Link } from 'react-router-dom'

function MakePost ({ handleAddPost, makePostDisplay, setMakePostDisplay }) {
  const [content, setContent] = useState('')
  const [makeFirstPostIsHidden, setMakeFirstPostIsHidden] = useState(false)
  const [makeSecondPostHidden, setMakeSecondPostHidden] = useState(false)
  const [user, setUser] = useState('')
  const [show, setShow] = useState('')
  const [search, setSearch] = useState('')
  const [showStars, setShowStars] = useState(false)
  const [rating, setRating] = useState(null)
  const history = useHistory()

  const handleReroute = () => {
    console.log('Reroute!')
    history.push('/')
  }

  useEffect(() => {
    fetch('/me').then(response => {
      if (response.ok) {
        response.json().then(data => setUser(data))
      }
    })
  }, [])

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
      .then(show => (show.name ? setShow(show) : reset2()))
    setMakeSecondPostHidden(makeSecondPostHidden => !makeSecondPostHidden)
    setMakeFirstPostIsHidden(makeFirstPostIsHidden => !makeFirstPostIsHidden)
    setSearch('')
  }

  function showSelected () {
    if (
      (show.name && makeFirstPostIsHidden === true) ||
      (makeSecondPostHidden === true && show.name)
    ) {
      return (
        <h3 className='header'>
          You are writing a post about the book, {show.name}
        </h3>
      )
    }
  }

  function handleSubmit (e) {
    e.preventDefault()
    const formData = {
      content: content,
      show_id: show.id,
      user_id: user.id,
      username: user.username,
      show_name: show.name
    }

    const ratingData = { rating: rating, show_id: show.id, user_id: user.id }

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
    setMakePostDisplay(makePostDisplay => !makePostDisplay)
    reset()
    setContent('')

    if (rating !== null) {
      fetch(`/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ratingData)
      })
        .then(r => r.json())
        .then(newrating => console.log(newrating))
    }
  }

  function handleWritePostClick () {
    setMakeFirstPostIsHidden(makeFirstPostIsHidden => !makeFirstPostIsHidden)
    setMakePostDisplay(makePostDisplay => !makePostDisplay)
    handleReroute()
  }

  function buttonToShow () {
    if (makeFirstPostIsHidden === false && makeSecondPostHidden === false) {
      return (
        <button className='submit-forms' onClick={handleWritePostClick}>
          Write a Post
        </button>
      )
    } else if (
      makeFirstPostIsHidden === true &&
      makeSecondPostHidden === false
    ) {
      return (
        <div className='submit-forms'>
          <button className='button-center' onClick={handleWritePostClick}>
            Don't Write a Post{' '}
          </button>
        </div>
      )
    } else {
      return null
    }
  }

  function reset () {
    setMakeSecondPostHidden(makeSecondPostHidden => false)
    setMakeFirstPostIsHidden(makeFirstPostIsHidden => false)
    setShow('')
    setMakePostDisplay(makePostDisplay => false)
  }

  function reset2 () {
    setMakeSecondPostHidden(makeSecondPostHidden => false)
    setMakeFirstPostIsHidden(makeFirstPostIsHidden => true)
    setShow('')
    setMakePostDisplay(makePostDisplay => true)
    alert('Book not found, try again')
  }

  function showRating () {
    setShowStars(showStars => !showStars)
    setRating(rating => null)
  }

  return (
    <>
      <div>
        {makeFirstPostIsHidden === true ? (
          <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h4 className='header3'>
              Search for the book you would like to post about
            </h4>
            <form onSubmit={handleSearch}>
              <input
                className='header4'
                type='text'
                placeholder='Book Name'
                onChange={handleShow}
                value={search}
              />
              <button type='Submit'>Search</button>
            </form>{' '}
            <br></br>
          </div>
        ) : null}

        {makeSecondPostHidden && show.name ? (
          <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {showSelected()}
            <div className='header2'>
              <form onSubmit={handleSubmit}>
                <input
                  className='post-size'
                  type='text'
                  placeholder='     Write your post'
                  onChange={handlePost}
                  value={content}
                />
                <button className='button' type='submit'>
                  Submit
                </button>
              </form>
              <br></br>
              <button onClick={showRating} className='post-size5'>
                {showStars ? "Don't Rate Book" : 'Rate the Book!'}{' '}
              </button>
              {showStars ? (
                <div className='post-size6' >
                  <br></br>
                  <StarRating rating={rating} setRating={setRating} />
                </div>
              ) : null}
            </div>
            <div>
              <br></br>
              <button onClick={reset}>Don't Make a Post </button>
            </div>
          </div>
        ) : null}
        {buttonToShow()}
      </div>
    </>
  )
}
export default MakePost
