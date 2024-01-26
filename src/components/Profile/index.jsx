import "./index.css";
import User from "../UserProfile";
import { SlUserFollowing } from "react-icons/sl";
import { SlUserFollow } from "react-icons/sl";
import { MdOutlinePostAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";


const Profile = () => {

  return (
    <>
      <div className="upper-profile-section mb-4">
        <User />
      </div>
      <div className="mt-4 middle-profile-section d-flex min-vw-100 m-auto justify-content-around gap-0">
        <div className="w-50 d-flex justify-content-around border-profile-main  mb-4 ">
          <NavLink
            to="/profile/posts"
            // activeClassName="active"
            className="profile-tabs-style text-color-light d-flex p-4 justify-content-center align-items-center gap-1"
          >
            <MdOutlinePostAdd /> Posts
          </NavLink>

          <NavLink
            to="/profile/followers"
            // activeClassName="active"
            className="profile-tabs-style text-color-light d-flex p-4 justify-content-center align-items-center gap-1"
          >
            <SlUserFollow /> Followers
          </NavLink>

          <NavLink
            to="/profile/following"
            // activeClassName="active"
            className="profile-tabs-style text-color-light d-flex p-4 justify-content-center align-items-center gap-1"
          >
            <SlUserFollowing /> Following
          </NavLink>
        </div>
      </div>
      <div className="mt-4 profile-tabs lower-profile-section">
        <Outlet />
      </div>
    </>
  );
};

export default Profile;
