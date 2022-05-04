import { useState, useEffect } from 'react';

function AddFriend({user}){
    const [me, setMe] =useState("")
    const [friendRequest, setFriendRequest]= useState(null)

    useEffect(() => {
        fetch("/me").then((response) => {
          if (response.ok) {
            response.json().then((data) => setMe(data));
          }
        });
      }, []);
    

    const newFriendData =
    {friended_person_id: user.id,
        user_id: me.id
    
    }

function Add(){



    fetch('/addfriend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFriendData),
    })
      .then((r) => r.json())
      .then((friendRequest) => setFriendRequest(friendRequest))}
      


return(
<div>
<button onClick={Add}> Add Friend </button>
{friendRequest ?<h2> Friend Request Sent to {user.username}</h2> : null}
</div>
)}
export default AddFriend;