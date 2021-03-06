import { useEffect, useState } from 'react'

function Vote () {
  const [rating, setRating] = useState(0)
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
    setRating(event.target.value)
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
    setSearch('')
  }

  function showSelected () {
    if (
      (show && makeFirstPostIsHidden === true) ||
      makeSecondPostHidden === true
    ) {
      return (
        <h3 className='submit-forms'>
          You are rating the show, {show.name}
        </h3>
      )
    }
  }

  console.log('showname', show.name)

  function handleSubmit (e) {
    e.preventDefault()
    const formData = {
      rating: rating,
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
    setMakePostDisplay(makePostDisplay => !makePostDisplay)
    reset()
    setContent('')
  }

  function handleWritePostClick () {
    setMakeFirstPostIsHidden(makeFirstPostIsHidden => !makeFirstPostIsHidden)
  }

  function buttonToShow () {
    if (makeFirstPostIsHidden === false && makeSecondPostHidden === false) {
      return (
        <button className='submit-forms' onClick={handleWritePostClick}>
          {' '}
          Write a Post{' '}
        </button>
      )
    } else if (
      makeFirstPostIsHidden === true &&
      makeSecondPostHidden === false
    ) {
      return (
        <div className='submit-forms'>
          <button className='button-center' onClick={handleWritePostClick}>
            {' '}
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

  return (
    <>
      {showSelected()}
      {makeFirstPostIsHidden ? (
        <div className='submit-forms'>
          <h2>Search for the movie you would like to post about</h2>
          <form className='submit-forms' onSubmit={handleSearch}>
            <input
              type='text'
              placeholder='Movie Name'
              onChange={handleShow}
              value={search}
            />
            <button className='submit-forms' type='Submit'>
              Submit
            </button>
          </form>{' '}
        </div>
      ) : null}

      {makeSecondPostHidden ? (
        <div>
      <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => setRating(index)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
          
            <div>
          <button onClick={reset}>Don't Make a Post </button>
        </div>
        </div>
      ) : null}
      {buttonToShow()}

    </>
  )
}
export default Vote;
