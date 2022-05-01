import Login from './Login.js'
// import MyProfile from './components/MyProfile.js';
import { useState, useEffect } from 'react';
import Signup from './Signup';
import Logout from './Logout.js';
import MyProfile from './MyProfile.js'
// import SwipePage from './components/SwipePage.js';
// import NavBar from './components/NavBar.js';
// import Matches from './components/Matches.js';
import { Route, Switch, useHistory } from "react-router-dom";
import FeedPage from './FeedPage.js'

function App() {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const history = useHistory();

  // const handleReroute = () => {
  //   console.log("Reroute!")
  //   history.push("/");
  //   }

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((data) => setUser(data));
      }
    });
  }, []);



  
    

  function login (username, password){
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => r.json())
      .then((data) => (user.username ? setUser(data) : null))
  }

  function handleDeleteUser(id){
    const updatedUsers =profiles.filter(p=>p.id!==id)
    setProfiles(updatedUsers)
  }

  function handleLogout() {
    fetch("/logout", {
        method: "DELETE",
        }).then(() => setUser())
        // .then(()=>handleReroute())
      }

  function handleDeleteProfile() {
    fetch(`/users/${user.id}`, {
      method: "DELETE",
    }).then(() => setUser())
    .then(()=>handleReroute())
  }


  return (
    
    <div>
      <div >
        <div>
      {user ? null : <Signup onLogin={setUser} login={login} /> }
      <nav className="nav-container">
      {user ? <Logout handleLogout={handleLogout}/> : <Login onLogin={setUser}/> }
       </nav> 
        </div>
       </div>
      <Switch>
      <Route exact path="/">
        <div>
      <h1 className="welcomeBanner">Welcome</h1>
      </div>
      {user ? <FeedPage user={user} setUser={setUser} /> : null}
      </Route>
      <Route exact path="/MyProfile">
        <MyProfile user={user} setUser={setUser} handleDeleteProfile={handleDeleteProfile} />
      </Route>
      </Switch>
    </div>
  );
}

export default App;