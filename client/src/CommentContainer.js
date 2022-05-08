import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import CommentForm from './CommentForm'

function CommentContainer({post}) {
    let comment = []
if (post.comments)
comment = post.comments.map((comment)=> <div className = "post-container"> 
<div className = "comment-format">
<Link to={`/users/${comment.username}`}>{comment.username}
            </Link>
<div className = "post-container">
{comment.content}

            </div>
</div></div>)

  return (
    <div>
      {comment}
    </div>
  );
}

export default CommentContainer;
