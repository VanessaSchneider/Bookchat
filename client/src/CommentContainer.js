import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import CommentForm from './CommentForm'

function CommentContainer({post}) {
console.log(post)
    let comment = []
if (post.comments)
comment = post.comments.map((comment)=> <div className = "post-container">{comment.content}<br></br>
<div className = "post-container">{comment.username}</div></div>)

  return (
    <div>
      {comment}
    </div>
  );
}

export default CommentContainer;
