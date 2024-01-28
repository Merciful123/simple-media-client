import { Link } from "react-router-dom";
import "./index.css";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Image as BootstrapImage } from "react-bootstrap";

const Feeds = () => {
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
      <div className="d-flex flex-column justify-content-center ">
        <div className="write-btn-con">
          <Link to={"/postform"}>
            <button className=" write-btn text-light primary-bg-color">
              Write
            </button>
          </Link>
        </div>
        <div className="feed-container">
          {(allPostsData?.posts?.length > 0
            ? allPostsData?.posts
            : hardcodedData
          )?.map((post) => (
            <div
              key={post?._id}
              className="shadow-sm feed-container-inner d-flex gap-4  justify-content-around  p-2 mt-3"
            >
              <div className="posts-img-con  align-self-start justify-self-center">
                <BootstrapImage
                  src={
                    post?.imageurl
                      ? post?.imageurl
                      : "https://placekitten.com/100/100"
                  }
                  alt="pic"
                  className="posts-img rounded-circle border border-secondary"
                />
              </div>
              <div className="d-flex flex-column gap-2 justify-content-between w-75 ">
                <div className="d-flex justify-content-between">
                  <div className="fs-4">{post?.username}</div>
                  <div className="">{getTimeAgo(post?.createdAt)}</div>
                </div>

                <div className="w-100 mt-4">{post?.postData}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feeds;
