import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import CommentForm from "./CommentForm";

function CommentContainer({ post, comments, handleAddComment }) {
  console.log("comments", comments);
  let comment = [];
  if (comments)
    comment = comments.map((comment) => (
      <div className="post-container">
        <div className="comment-format">
          <Link to={`/users/${comment.username}`}>{comment.username}</Link>
          <div className="post-container">
            <div className="post-container">
              <Link to={`/comments/${comment.id}`}>
                <button className="button2">{comment.content}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));

  return <div>{comment}</div>;
}

export default CommentContainer;
