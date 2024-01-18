import Form from "react-bootstrap/Form";
import Img from "../../../assets/SignUp.png"
import { useState } from "react";
import "./index.css"
import axios from "axios";

const SignUp = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword:""
  })

  const handleChange = (e) => {
      setData({...data, [e.target.name]:e.target.value})

  }

  const handleAuth = async (e) => {
    console.log(data)
    console.log(isSignUp)
    e.preventDefault()
    try {
      if (isSignUp) {
          console.log(data)

        const auth = await axios.post(
          "http://localhost:6060/api/register",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("message", auth.data);


      } else {
        const auth = await axios.post("http://localhost:6060/api/login", data);
        console.log("message", auth.data);
       
      }
      } catch (error) {
      console.log(error)
    }
  }



  const[isSignUp, setIsSignUp] = useState(true)

  // const [ confirmpassword, setConfirmpassword] = useState(true)
  return (
    <div className="container overflow-x-hidden d-flex   justify-content-between min-vw-100">
      <div className="d-flex flex-column w-100 ms-4 mt-4">
        <h3 className="primary-color">TweetX</h3>
        <button
          onClick={() => setIsSignUp((prev) => !prev)}
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
      </div>

      <div className="w-100">
        <img src={Img} alt="" className="w-100" />
      </div>
    </div>
  );
};

export default SignUp;
