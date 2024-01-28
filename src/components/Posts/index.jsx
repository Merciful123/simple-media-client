import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import "./index.css";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import {  Image as BootstrapImage} from "react-bootstrap";



const Posts = () => {
  const { userData } = useUser();

  const userId = userData?._id;

  const [allPostsData, setAllPostsData] = useState([]);

  console.log(allPostsData);
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const posts = await axios.get(
          `https://orca-app-tsayf.ondigitalocean.app/api/allposts/${userId}`
        );
        setAllPostsData(posts?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPosts();
  }, []);

  //  handling post creation time
  
  const getTimeAgo = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };


  const hardcodedData = [
    {
      _id: "1",
      username: "John Doe hard coded",
      createdAt: new Date().toISOString(),
      postData: "This is a hardcoded post.",
    },
    // Add more hardcoded posts as needed
  ];

  return (
    <>
      {(allPostsData?.posts?.length > 0
        ? allPostsData?.posts
        : hardcodedData
      )?.map((post) => (
        <div
          key={post?._id}
          className="shadow-sm  post-author d-flex gap-4 justify-content-around w-100 mt-2 p-2"
        >
          <div className="posts-img-con  justify-self-center">
            <BootstrapImage
              src={post?.imageUrl || "https://placekitten.com/100/100"}
              alt="pic"
              roundedCircle
              className="posts-img border border-secondary"
            />
          </div>
          <div className=" d-flex flex-column gap-2 justify-content-between  w-75 ">
            <div className=" d-flex justify-content-between">
              <div className="fs-4">{post?.username}</div>
              <div className="">{getTimeAgo(post?.createdAt)}</div>
            </div>
            <div className="w-100 mt-4">{post?.postData}</div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Posts;
