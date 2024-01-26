import { Form, Toast, ToastContainer } from "react-bootstrap";
import "./index.css";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

const PostForm = () => {
  const [post, setPost] = useState({
    postData: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { userData } = useUser();
  console.log(userData)

   
   const handleInputChange = (e) => {
     setPost({
       ...post,
       [e.target.name]: e.target.value,
     });
  };
  

  const handlePostSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // You can now access userId from postData
      const response = await axios.post(
        "https://orca-app-tsayf.ondigitalocean.app/api/createpost",
        {
          userId: userData?._id,
          postData: post?.postData,
          // ... other necessary data ...
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToastMessage("Post created successfully!");
      setShowToast(true);
      setPost({
        postData: "",
      });

      console.log("Post created successfully:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

 
  return (
    <>
      <div className="post-form-container d-flex">
        <Form className="post-form  mt-5" onSubmit={handlePostSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Write you post</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="postData"
              value={post.postData}
              onChange={handleInputChange}
            />
          </Form.Group>

          <button
            type="submit"
            className=" auth-btn primary-bg-color text-light w-25"
          >
            Post
          </button>
        </Form>
      </div>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          className="position-fixed bottom-0 end-0 p-3"
          position="top-end"
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default PostForm;
