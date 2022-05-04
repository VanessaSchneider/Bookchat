import { useState, useEffect } from 'react';

function AddFriend({user}){
    const [me, setMe] =useState("")

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
        body: JSON.stringify(newFriendData)
      })


    }


return(
<div>
<button onClick={Add}> Add Friend </button>
</div>
)}
export default AddFriend;