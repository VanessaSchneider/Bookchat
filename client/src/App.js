import Login from './Login.js'
// import MyProfile from './components/MyProfile.js';
import { useState, useEffect } from 'react'
import Signup from './Signup'
import Logout from './Logout.js'
import MyProfile from './MyProfile.js'
// import NavBar from './components/NavBar.js';
import { Route, Switch, useHistory, Link, useLocation } from 'react-router-dom'
import FeedPage from './FeedPage.js'
import MakePost from './MakePost.js'
import UserPage from './UserPage'
import ShowPage from './ShowPage'
import Messages from './Messages'
import Vote from './Vote'
import TweetPage from './TweetPage'
import photo from './photo.jpeg'

function App () {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const history = useHistory()
  const location = useLocation()
  const [makePostDisplay, setMakePostDisplay] = useState(false)

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

  console.log('location', location.pathname)

  function login (username, password) {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(r => r.json())
      .then(data => (user.username ? setUser(data) : null))
  }

  function handleDeleteUser (id) {
    const updatedUsers = profiles.filter(p => p.id !== id)
    setProfiles(updatedUsers)
  }

  function handleAddPost (newPost) {
    setPosts([newPost, ...posts])
  }

  useEffect(() => {
    fetch('/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  function handleLogout () {
    fetch('/logout', {
      method: 'DELETE'
    })
      .then(() => setUser())
      .then(() => handleReroute())
  }

  function handleDeleteProfile () {
    fetch(`/users/${user.id}`, {
      method: 'DELETE'
    })
      .then(() => setUser())
      .then(() => handleReroute())
  }

  return (
    <div>
      <div>
        <div>
          <nav className='nav'>
            {user ? null : <Signup onLogin={setUser} login={login} />}
            {user ? (
              <Logout handleLogout={handleLogout} />
            ) : (
              <Login onLogin={setUser} />
            )}
            {user ? (
              <MakePost
                makePostDisplay={makePostDisplay}
                setMakePostDisplay={setMakePostDisplay}
                handleAddPost={handleAddPost}
                user={user}
                setUser={setUser}
              />
            ) : null}
            {/* {user && location.pathname !=="/messages" ? <Link to="/messages">
    <button >Messages</button>
    </Link>: null} */}
            {/* {user && location.pathname !=="/vote" ? <Link to="/vote">
    <button >Rate the Movie</button>
    </Link>: null} */}
            {user && location.pathname !== '/' ? (
              <Link to='/'>
                <button>Home</button>
              </Link>
            ) : null}
          </nav>
          <br></br>
         {user?null:<h1 className="below-nav">Read & Talk</h1>}
         {user?null:<img src = {photo} className="size"></img>}

        </div>
      </div>
      <Switch>
        <Route exact path='/'>
          <div>
            {user && makePostDisplay === false ? (
              <h1 className = "below-nav">Welcome {user.username} </h1>
            ) : null}
          </div>
          {user && makePostDisplay === false ? (
            <FeedPage
              user={user}
              setUser={setUser}
              posts={posts}
              users={users}
            />
          ) : null}
        </Route>
        <Route exact path='/MyProfile'>
          <MyProfile
            user={user}
            setUser={setUser}
            handleDeleteProfile={handleDeleteProfile}
          />
        </Route>
        <Route exact path={`/users/:username`}>
          <UserPage users={users} />
        </Route>
        <Route exact path={`/shows/:name`}>
          <ShowPage users={users} />
        </Route>
        <Route exact path='/Vote'>
          <Vote />
        </Route>

        <Route exact path='/Messages'>
          <Messages />
        </Route>
        <Route exact path={`/posts/:id`}>
          <TweetPage posts ={posts} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
