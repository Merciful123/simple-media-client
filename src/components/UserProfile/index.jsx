import "./index.css"
const User = () => {
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
        <div className="justify-self-start fs-4">Name</div>
        <div className="d-flex justify-content-between gap-4">
          <div>Post</div>
          <div>Follower</div>
          <div>Following</div>
        </div>
      </div>
    </div>
  );
};

export default User;
