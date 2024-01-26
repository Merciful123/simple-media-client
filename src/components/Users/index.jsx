import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";

const Users = () => {


  const [users, setUsers] = useState([]);
 console.log(users)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://orca-app-tsayf.ondigitalocean.app/api/allusers"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  return (
    <>
      <div className="users-container-main flex-column justify-content-center d-flex">
        {users.map((user) => (
          <div
            key={user._id}
            className="users-container d-flex gap-4 justify-content-around mt-4"
          >
            <div className="align-self-start justify-self-center">
              <img
                src=""
                style={{ minHeight: "7vh" }}
                alt="pic"
                className="rounded-circle border border-secondary h-100 w-100"
              />
            </div>
            <div className="d-flex flex-column gap-2 justify-content-between w-75">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column gap-1">
                  <div className="fs-4">{user.name}</div>
                  <div className="followers-count">
                    Followers: {user.followers.length}
                  </div>
                </div>
                <button className="followers-follow-btn text-light primary-bg-color">
                  Follow
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
