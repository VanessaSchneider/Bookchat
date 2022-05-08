import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function TweetPage({ handleDeletePost }) {
  const [post, setPost] = useState("");
  const [user, setUser] = useState("");
  const history = useHistory();
  const { id } = useParams();
  const postData = {
    id: id,
  };

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((data) => setUser(data));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/getpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((r) => r.json())
      .then((post) => setPost(post));
  }, []);

  function handleDelete() {
    fetch(`/posts/${post.id}`, {
      method: "DELETE",
    }).then(() => console.log("deleted!"));
    handleDeletePost(post.id);
    toDelete(post.id);

    alert("You have deleted the post");
  }

  const handleReroute = () => {
    console.log("Reroute!");
    history.push("/");
  };

  function toDelete(id) {
    setPost(null);
    handleReroute();
  }

  return (
    <div>
      {post ? (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <div className="post-container"><img className="tweetimage"  src={post.user.photo}></img> </div>
          <div className="post-container">
            <Link to={`/users/${post.username}`}>{post.username}</Link>
          </div>
          <div className="post-container">
            {post.content}
            <br></br>
            {post.username === user.username ? (
              <button onClick={handleDelete}>Delete Post</button>
            ) : null}
          </div>
        </div>
      ) : (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h3> Post was deleted!</h3>
        </div>
      )}
    </div>
  );
}

export default TweetPage;
