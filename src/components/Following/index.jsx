import { useState } from "react";
import { useUser } from "../../context/UserContext";
import "./index.css";
import axios from "axios";
import { useEffect } from "react";
import { IoMdCheckbox } from "react-icons/io";
import { Image as BootstrapImage } from "react-bootstrap";

const Following = () => {
  const [followings, setFollowings] = useState([]);
  console.log(followings);
  const [userDatails, setUserDatails] = useState();
  console.log(userDatails);
  // getting from context
  const { userData } = useUser();
  const userId = userData?._id;

  const followingsIds = userDatails?.user?.following;
  console.log(followingsIds);
  // fetching user details

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await axios.get(
          `https://simple-media-api.onrender.com/api/getuserdetails/${userId}`
        );
        setUserDatails(data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [userId]);
  //

 const fetchUserDetails = async (userIds) => {
   try {
     const userPromises = userIds?.map((userId) =>
       axios.get(
         `https://simple-media-api.onrender.com/api/getuserdetails/${userId}`
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


  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        const followingsDetails = await fetchUserDetails(followingsIds);
        setFollowings(followingsDetails);
      } catch (error) {
        console.log(error);
        // Handle error if needed
      }
    };

    fetchFollowings();
  }, [followingsIds]);


  const hardcodedData = [
    {
      user: {
        _id: "1",
        name: "John Doe hard coded",
        followers: ["follower1", "follower2"],
      },
    },
    // Add more hardcoded data as needed
  ];

  return (
    <>
      {(followings?.length > 0 ? followings : hardcodedData)?.map(
        (following) => (
          <div
            key={following?.user?._id}
            className="d-flex gap-4 flex-row justify-content-around align-items-center w-100 mt-4"
          >
            <div className="  align-self-start justify-self-center">
              <BootstrapImage
                src={following?.imageurl ? following?.imageurl : "https://placekitten.com/100/100"}
                style={{ minHeight: "7vh" }}
                alt="pic"
                className="following-sec-img rounded-circle border border-secondary"
              />
            </div>
            <div className="d-flex flex-column gap-2 justify-content-between w-75 ">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column gap-1">
                  <div className="fs-4">{following?.user?.name}</div>
                  <div className="follow-count">
                    Followers: {following?.user?.followers.length}
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <span> Following </span>
                  <span>
                    <IoMdCheckbox className="text-success" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Following;
