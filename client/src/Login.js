import { useState } from 'react'

function Login ({ onLogin, fetchProfiles }) {
  const [login, setLogin] = useState(false)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  // login
  function handleSubmit (e) {
    e.preventDefault()
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(r => r.json())
      .then(user => (user.username ? onLogin(user) : alert(user.error)))
    setUserName('')
    setPassword('')
  }

  //

  const loginBox = (
    <div className='login'>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className='mb-3'></div>
            <input
              type='text'
              value={username}
              onChange={e => setUserName(e.target.value)}
              placeholder='Username'
            ></input>
            <div className='mb-3'>
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
              ></input>
            </div>
            <input type='submit' className='btn btn-outline-light'></input>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div>
      <nav>
        <button
          type='button'
          className='btn btn-outline-light'
          onClick={() => setLogin(!login)}
        >
          Login
        </button>
        {login ? loginBox : null}
      </nav>
    </div>
  )
}

export default Login
