import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./index.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const NavBar = () => {
  //  handling logout
  const navigate = useNavigate();

  const { updateUser, userData } = useUser();
  console.log(userData);
  const handleLogout = () => {
    // Clear user data
    updateUser(null);
    // Redirect to login page or any other page
    navigate("/");
  };
  return (
    <div className="d-flex flex-column main-navbar min-vw-100 ">
      <Navbar className="bg-body-tertiary shadow-sm w-100 bg-slate-400 ">
        <Container className=" w-100 bg-green-500 ">
          <Navbar.Brand href="#home" className="w-25 ">
            <Link to="/">
              <h3 className="primary-color">TweetX</h3>
            </Link>
          </Navbar.Brand>
          <div className="d-flex justify-content-around gap-5 menu">
            <NavLink
              className="fw-bold text-color-light navbar-items"
              // as={NavNavLink}
              to="/feeds"
              // exact
              // activeClassName="active"
            >
              Feeds
            </NavLink>
            <NavLink
              className="fw-bold text-color-light navbar-items"
              // as={NavNavLink}
              to="/users"
              // exact
              // activeClassName="active"
            >
              Users
            </NavLink>
            <NavLink
              className="fw-bold text-color-light navbar-items"
              // as={NavNavLink}
              to="/profile"
              // exact
              // activeClassName="active"
            >
              Profile
            </NavLink>
            {userData && (
              <div
                className="w-25 fw-bold text-color-light logout-btn"
                onClick={handleLogout}
              >
                Logout
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
