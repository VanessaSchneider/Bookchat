
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';

function UserPage({users}){
const { username }  = useParams();



const user = users.find( user => user.username === username )

console.log(user)

return (

    <div>
userpage

    </div>
)



}

export default UserPage;