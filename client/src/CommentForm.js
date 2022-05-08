import { useState, useEffect } from 'react'

function CommentForm ({postData, user}) {
  const [content, setContent] = useState("")

  console.log(postData)
  console.log(user)
function handleSubmit(e){
  e.preventDefault()
  const commentData = { content: content,
                      user_id : user.id,
                      post_id : parseInt(postData.id)}
  fetch('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  })
    .then(r => r.json())
    .then(comment => (console.log("comment", comment)))

  setContent("")

}

function handleComment(e){
  setContent(event.target.value)

}


return(
<div>
<div className='header2'>
              <form onSubmit={handleSubmit}>
                <input
                  className='post-size'
                  type='text'
                  placeholder='Write your comment'
                  onChange={handleComment}
                  value={content}
                />
                <button className='button' type='submit'>
                  Submit
                </button>
              </form>
              </div>



</div>


)

  }
  
  export default CommentForm;
  