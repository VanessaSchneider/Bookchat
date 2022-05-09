import { useState, useEffect } from 'react'

function CommentForm ({postData, user, commentForm, setCommentForm, handleAddComment}) {
  const [content, setContent] = useState("")

  console.log(postData)
  console.log(user)
function handleSubmit(e){
  e.preventDefault()
  const commentData = { 
                      post_id : parseInt(postData.id),
                      user_id : user.id,
                      content: content,
                      username : user.username
                    
                    }
  fetch('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  })
    .then(r => r.json())
    .then(comment => (handleAddComment(comment)))
setCommentForm((commentForm)=>false)
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
                  className='post-size4'
                  type='text'
                  placeholder='Write your comment'
                  onChange={handleComment}
                  value={content}
                />
                <br></br>
                <div className = 'post-size3'>
                <button className='button' type='submit'>
                  Submit
                </button>
                </div>
              </form>
              </div>



</div>


)

  }
  
  export default CommentForm;
  