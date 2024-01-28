import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { Toast, ToastContainer } from "react-bootstrap";
import "./index.css"
import { Image as BootstrapImage } from "react-bootstrap";


const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { userData } = useUser();
  const userId = userData?._id;

  const fetchUserDetails = async (userIds) => {
    try {
      const userPromises = userIds.map((userId) =>
        axios.get(
          `https://orca-app-tsayf.ondigitalocean.app/api/getuserdetails/${userId}`
        )
      );

      const usersDataFetch = await Promise.all(userPromises);
      const usersDetails = usersDataFetch?.map((response) => response.data);

      return usersDetails;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  const handleFollow = async (userIdToFollow) => {
    try {
      const response = await axios.post(
        `https://orca-app-tsayf.ondigitalocean.app/api/followuser`,
        {
          userId: userId,
          followUserId: userIdToFollow,
        }
      );

      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower?.user?._id === userIdToFollow
            ? {
                ...follower,
                user: {
                  ...follower.user,
                  followers: [...follower.user.followers, userId],
                },
              }
            : follower
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

  const followerIds = userData?.followers;

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const followersDetails = await fetchUserDetails(followerIds);
        setFollowers(followersDetails);
      } catch (error) {
        console.log(error);
        // Handle error if needed
      }
    };

    fetchFollowers();
  }, [followerIds]);
  // Simulated hardcoded data
  const hardcodedData = [
    {
      user: {
        _id: "1",
        name: "John Doe",
        followers: ["follower1_1", "follower1_2"],
      }
    },
    {
      user: {
        _id: "2",
        name: "Jane Smith",
        followers: ["follower2_1", "follower2_2"],
      },
     
    },
    // Add more hardcoded users as needed
  ];

  return (
    <>
      {(followers?.length > 0 ? followers : hardcodedData)?.map((follower) => (
        <div
          key={follower?.user?._id}
          className="shadow-sm followers-container d-flex gap-4 flex-row justify-content-around align-items-center w-100 mt-4 p-3"
        >
          <div className="align-self-start">
            <BootstrapImage
              src={
                follower?.imageurl
                  ? follower?.imageurl
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
                <div className="fs-4">{follower?.user?.name}</div>
                <div className="followers-count">
                  Followers: {follower?.user?.followers?.length}
                </div>
              </div>
              <button
                onClick={() => handleFollow(follower?.user?._id)}
                className="followers-follow-btn text-light primary-bg-color"
              >
                {follower?.user?.followers.includes(userId)
                  ? "Followed"
                  : "Follow"}
              </button>
            </div>
          </div>
        </div>
      ))}

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

export default Followers;
