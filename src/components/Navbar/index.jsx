import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./index.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="d-flex flex-column main-navbar min-vw-100">
      <Navbar className="bg-body-tertiary shadow-sm w-100">
        <Container className=" w-100 ">
          <Navbar.Brand href="#home" className="w-25 ">
            <h3 className="primary-color">TweetX</h3>
          </Navbar.Brand>
          <div className="d-flex justify-content-around gap-5 menu">
            <Nav.Link
              className="fw-bold text-color-light"
              as={NavLink}
              to="/feeds"
              exact
              activeClassName="active"
            >
              Feeds
            </Nav.Link>
            <Nav.Link
              className="fw-bold text-color-light"
              as={NavLink}
              to="/users"
              exact
              activeClassName="active"
            >
              Users
            </Nav.Link>
            <Nav.Link
              className="fw-bold text-color-light active"
              as={NavLink}
              to="/profile"
              exact
              activeClassName="active"
            >
              Profile
            </Nav.Link>
            <div className="w-25"></div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
