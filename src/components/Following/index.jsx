import "./index.css"
const Following = () => {
  return (
    <div className="d-flex gap-4 flex-row justify-content-around align-items-center w-100 mt-4">
      <div className="  align-self-start justify-self-center">
        <img
          src=""
          style={{ minHeight: "7vh" }}
          alt="pic"
          className="following-sec-img rounded-circle border border-secondary"
        />
      </div>
      <div className="d-flex flex-column gap-2 justify-content-between w-75 ">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column gap-1">
            <div className="fs-4">name</div>
            <div className="follow-count">Followers</div>
          </div>
          <div className="">Following</div>
        </div>
      </div>
    </div>
  );
};

export default Following;
