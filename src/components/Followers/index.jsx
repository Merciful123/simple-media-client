import "./index.css";
const Followers = () => {
  return (
    <div className="d-flex gap-4 flex-row justify-content-around align-items-center w-100 mt-4">
      <div className="  align-self-start justify-self-center">
        <img
          src=""
          style={{ minHeight: "7vh" }}
          alt="pic"
          className="rounded-circle border border-secondary h-100 w-100"
        />
      </div>
      <div className="d-flex flex-column gap-2 justify-content-between w-75 ">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column gap-1">
            <div className="fs-4">name</div>
            <div className="followers-count">Followers</div>
          </div>
          <button className="followers-follow-btn text-light primary-bg-color">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Followers;
