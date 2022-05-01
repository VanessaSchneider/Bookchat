import Login from './components/Login.js'
// import MyProfile from './components/MyProfile.js';
import { useState, useEffect } from 'react';
import Signup from './components/Signup';
import Logout from './components/Logout.js';
// import SwipePage from './components/SwipePage.js';
// import NavBar from './components/NavBar.js';
// import Matches from './components/Matches.js';
import { Route, Switch, useHistory } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const [matches, setMatches] = useState([])
  const history = useHistory();

  const handleReroute = () => {
    console.log("Reroute!")
    history.push("/");
    }

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
        .then(()=>handleReroute())
      }

  function handleDeleteProfile() {
    fetch(`/users/${user.id}`, {
      method: "DELETE",
    }).then(() => setUser())
    .then(()=>handleReroute())
  }


  return (
    
    <div className="App">
      <div className="sidenav" >
        <div className="sidenav-content">
      {user ? null : <Signup onLogin={setUser} login={login} /> }
      <nav className="nav-container">
      {user ? <Logout handleLogout={handleLogout}/> : <Login onLogin={setUser}/> }
       </nav> 
        </div>
       </div>
      <Switch>
      <Route exact path="/">
        <div style={{width: "30rem"}}>
      <h1 className="welcomeBanner">{welcome}</h1>
      </div>
      {(user && profiles) ? <SwipePage getMatches={getMatches} setMatches={setMatches} setUser={setUser} handleDeleteUser={handleDeleteUser} profiles={profiles} setProfiles={setProfiles} user={user}/> : null}
      </Route>
      <Route exact path="/myProfile">
        <MyProfile user={user} setUser={setUser} handleDeleteProfile={handleDeleteProfile} />
      </Route>
      </Switch>
    </div>
  );
}

export default App;