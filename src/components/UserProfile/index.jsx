import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import "./index.css"
import axios from "axios";
const User = () => {
  const { userData } = useUser();

  const userId = userData?._id;

  const [userPostsCount, setUserPostsCount] = useState(0)

  console.log(userPostsCount)
  useEffect(() => {
    const fetcPostCount = async () => {
       try {
         const userPostsCount = await axios.get(
           `https://orca-app-tsayf.ondigitalocean.app/api/singleuserposts/${userId}`
         );
         setUserPostsCount(userPostsCount?.data?.postCount);
       } catch (error) {
         console.log(error)
       }
    }


   fetcPostCount()
  } , [userId])


  const [userDatails, setUserDatails] = useState()
 console.log(userDatails);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await axios.get(
          `https://orca-app-tsayf.ondigitalocean.app/api/getuserdetails/${userId}`
        );
        setUserDatails(data?.data);
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  },[])


 console.log(userData)
  return (
    <div className="d-flex  justify-content-center align-items-center profile mt-5">
      <div className="d-flex profile-img">
        <img
          src=""
          alt="pic"
          className="rounded-circle border w-100 h-100 border-secondary"
        />
      </div>
      <div className="d-flex flex-column justify-content-center gap-4 w-50">
        <div className="justify-self-start fs-4">{userData?.name}</div>
        <div className="d-flex justify-content-between gap-4">
          <div>Posts: {userPostsCount}</div>
          <div>Followers: {userDatails?.user?.followers?.length}</div>
          <div>Following: {userDatails?.user?.following?.length}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
