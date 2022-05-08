import { useState, useEffect } from 'react'

function CommentForm () {
  const [content, setContent] = useState("")

function handleSubmit(){
  console.log(content)

}

function handleComment(){
  setContent(content)

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
  