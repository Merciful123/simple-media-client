import "./index.css";

const Posts = () => {
  return (
    <div className="post-author d-flex gap-4 flex-row justify-content-around align-items-center w-100 mt-4">
      <div className="posts-img-con  align-self-start justify-self-center">
        <img
          src=""
          alt="pic"
          className="posts-img rounded-circle border border-secondary"
        />
      </div>
      <div className="d-flex flex-column gap-2 justify-content-between w-75 ">
        <div className="d-flex justify-content-between">
          <div className="fs-4">name</div>
          <div className="">time</div>
        </div>

        <div className="w-100 mt-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed vitae
          velit culpa quisquam inventore laudantium quaerat in, numquam
          doloribus consequuntur.
        </div>
      </div>
    </div>
  );
};
export default Posts;
