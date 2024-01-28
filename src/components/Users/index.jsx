import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { Toast, ToastContainer } from "react-bootstrap";
import { Image as BootstrapImage } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);
  console.log(users);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { userData } = useUser();
  const userId = userData?._id;
  const handleFollow = async (userIdToFollow) => {
    try {
      const response = await axios.post(
        `https://orca-app-tsayf.ondigitalocean.app/api/followuser`,
        {
          userId: userId,
          followUserId: userIdToFollow,
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userIdToFollow
            ? { ...user, followers: [...user.followers, userId] }
            : user
        )
      );
      setToastMessage(response.data.message);
      setShowToast(true);
      // You can update the state or UI to reflect that the user is now being followed
    } catch (error) {
      setToastMessage("User followed already or Invalid request!");
      setShowToast(true);
      console.error("Error following user:", error);
      // Handle errors or display a message to the user
    }
  };

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

  // Hardcoded user data
  const hardcodedData = [
    {
      _id: "1",
      name: "John Doe hard coded",
      followers: ["follower1", "follower2"],
    },
    {
      _id: "2",
      name: "Jane Smith hard coded",
      followers: ["follower3", "follower4"],
    },
    // Add more hardcoded users as needed
  ];

 
  return (
    <>
      <div className="users-container-main flex-column justify-content-start  d-flex">
        {(users?.length > 0 ? users : hardcodedData)?.map((user) => (
          <div
            key={user._id}
            className="users-container d-flex gap-4 justify-content-around  mt-4 p-3"
          >
            <div className="align-self-start justify-self-center">
              <BootstrapImage
                src={
                  user?.imageurl
                    ? user?.imageurl
                    : "https://placekitten.com/100/100"
                }
                style={{ minHeight: "7vh" }}
                alt="pic"
                className="rounded-circle border border-secondary h-100 w-100"
              />
            </div>
            <div className="d-flex flex-column gap-2 justify-content-between w-75">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column gap-1">
                  <div className="fs-4">{user.name ? user.name : "Name"}</div>
                  <div className="followers-count">
                    Followers: {user.followers.length}
                  </div>
                </div>
                <button
                  onClick={() => handleFollow(user?._id)}
                  className="users-follow-btn text-light primary-bg-color"
                >
                  {user.followers.includes(userId) ? "Followed" : "Follow"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-end" className="p-3 " style={{ zIndex: 1 }}>
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
      </ToastContainer>
    </>
  );
};

export default Users;
