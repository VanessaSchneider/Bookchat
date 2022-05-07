import React from 'react'
import { useState } from 'react'

function Signup ({ login }) {
  const [signup, setSignup] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')
  const [bio, setBio] = useState('')

  function handleSignup (e) {
    e.preventDefault()
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        passwordConfirmation,
        name,
        age,
        email,
        location,
        photo,
        bio
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.errors) {
          data.errors.forEach(e =>
            e === 'Age must be greater than or equal to 18'
              ? alert('Must be 18 or older')
              : alert(e)
          )
        } else {
          setSignup(false)
          setUsername('')
          setPassword('')
          setPasswordConfirmation('')
          setAge('')
          setEmail('')
          setPhoto('')
          setBio('')
          alert('Profile Successfully Created! Please Log In.')
        }
      })
  }

  const signupBox = (
    <div className='signup'>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder='username'
          />
        </div>
        <div>
          <input
            type='text'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='password'
          />
        </div>
        <div>
          <input
            type='text'
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            placeholder='password confirmation'
          />
        </div>
        <div>
          <input
            type='text'
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder='age'
          />
        </div>
        <div>
          <input
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='email'
          />
        </div>
        <div>
          <input
            type='text'
            value={photo}
            onChange={e => setPhoto(e.target.value)}
            placeholder='photo'
          />
        </div>
        <div>
          <input
            type='text'
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder='bio'
          />
        </div>
        <div>
          <input type='submit' className='btn btn-outline-light'></input>
        </div>
      </form>
    </div>
  )

  return (
    <div>
      <nav>
        <button
          type='button'
          className='btn btn-outline-light'
          onClick={() => setSignup(!signup)}
        >
          Signup
        </button>
        {signup ? signupBox : null}
      </nav>
    </div>
  )
}

export default Signup
