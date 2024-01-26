// import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import Feeds from "./components/Feed";
import Profile from "./components/Profile";
import PostForm from "./components/PostForm";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Followers from "./components/Followers";
import Following from "./components/Following";
import Auth from "./components/Auth";
import PageNotFound from "./components/PageNotFound";
// import PrivateRoute from "./components/ProtectedRoute";
import { useUser } from "./context/UserContext";

const App = () => {
    const { userData } = useUser();

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/feeds"
          element={userData ? <Feeds /> : <Navigate to="/" />}
        />
        <Route
          path="/users"
          element={userData ? <Users /> : <Navigate to="/" />}
        />
        <Route
          path="/postform"
          element={userData ? <PostForm /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/" />}
        >
          <Route path="posts" element={<Posts />} />{" "}
          <Route path="followers" element={<Followers />} />{" "}
          <Route path="following" element={<Following />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;

 

 
