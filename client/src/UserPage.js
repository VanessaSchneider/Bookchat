
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';

function UserPage({users}){
const { username }  = useParams();



const user = users.find( user => user.username === username )

let post = []
post = user.posts.map((post)=><div>
    {post.content}
</div>)


return (

    <div>
        {user.username}
        <br></br>
        <img src = {user.photo}></img>
        {user.bio}
        {post}

    </div>
)



}

export default UserPage;