import { useEffect, useState } from "react";

function MakePost({handleAddPost}) {
  const [content, setContent] = useState("");
  const [makePostIsHidden, setMakePostIsHidden] = useState(false)
  const [user, setUser] =useState("")


  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((data) => setUser(data));
      }
    });
  }, []);


  console.log(user)



  function handlePost(event) {
    setContent(event.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();
      const formData = {
         content: content,
         user_id: user.id,
        };


        console.log(formData)
      fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
        .then((r) => r.json())
        .then((newPost) => handleAddPost(newPost));

  }

  function handleWritePostClick() {
    setMakePostIsHidden(makePostIsHidden => !makePostIsHidden)
  }

  return (
    <>
      { makePostIsHidden ? ( 
        <div>  
          <form onSubmit={handleSubmit}>
            <input type="text"
            className="textpost"
             placeholder="Write your post" onChange={handlePost} value={content} />
            <button className="button" type="submit">Submit</button>
          </form> 
        </div> ) : null }
        <button className="button" onClick={handleWritePostClick}> {makePostIsHidden ? "Hide Post Field" : "Write a Post"} </button>
    </>
  );
}
  export default MakePost;