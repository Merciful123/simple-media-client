import Form from "react-bootstrap/Form";
import Img from "../../assets/SignUp.png"
import { useState } from "react";
import "./index.css"
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword:""
  })
  const [isSignUp, setIsSignUp] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { userData, updateUser } = useUser();

  const navigate = useNavigate();


  const handleChange = (e) => {
      setData({...data, [e.target.name]:e.target.value})

  }

  const handleAuth = async (e) => {
    console.log(data);
    console.log(isSignUp);
    e.preventDefault();
    try {
      if (isSignUp) {
        const auth = await axios.post(
          "https://simple-media-api.onrender.com/api/register",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        updateUser(auth.data.user); // Update user data
        setToastMessage(auth.data.message);
      } else {
        const auth = await axios.post(
          "https://simple-media-api.onrender.com/api/login",
          data
        );
        updateUser(auth.data.user); // Update user data
        setToastMessage(auth.data.message);
      }

      setShowToast(true);
      navigate("/profile")
      setData({ name: "", email: "", password: "", confirmpassword: "" });
    } catch (error) {
      setToastMessage("invalid request");
      setShowToast(true);
      console.log(error);
    }
  };


const toggleSignUp = () => {
  setIsSignUp((prev) => !prev);
  setShowToast(false); // Hide the toast when toggling between Login and Sign Up
};

  
  
  
  // const [ confirmpassword, setConfirmpassword] = useState(true)
  return (
    <div className="container login-container overflow-x-hidden d-flex   justify-content-between min-vw-100">
      <div className="d-flex flex-column w-100 ms-4 mt-5">
        {/* <h3 className="primary-color">TweetX</h3> */}
        <button
          onClick={toggleSignUp}
          className="p-2 mt-2 border login-btn rounded-3 text-color-dark"
        >
          {isSignUp ? "Login" : "Create Account"}
        </button>
        <h2 className="text-color-dark mt-5">
          {isSignUp ? "Create Account" : "Login"}
        </h2>

        <Form className="w-50 mt-5" onSubmit={handleAuth}>
          {isSignUp ? (
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                value={data.name}
              />
            </Form.Group>
          ) : (
            ""
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
          </Form.Group>
          {isSignUp ? (
            <Form.Group className="mb-3" controlId="confirmpassword">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                onChange={handleChange}
                value={data.confirmpassword}
              />
            </Form.Group>
          ) : (
            ""
          )}

          <button
            type="submit"
            className=" auth-btn primary-bg-color text-light"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </Form>
        {/*  */}
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          autohide={true}
          delay={"4000"}
          className="position-fixed bottom-0 end-0 p-3 absolute top-0 right-0 h-25"
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
        {/*  */}
      </div>

      <div className="w-100">
        <img src={Img} alt="" className="w-100" />
      </div>
    </div>
  );
};

export default Auth;
