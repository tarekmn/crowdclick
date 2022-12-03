import { useAppContext } from "../utils/AppContext";
import { useEffect, useState } from "react";

const Profile = (props) => {
  const { appState, currentUser } = useAppContext();

  console.log(currentUser);

  if (currentUser.length <= 0) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <div className="padding">
          <div className="profile-header">
            <div className="d-flex justify-content-center">
              <img
                className="mb-4 mt-4 profile-pic"
                src={`/stock/${currentUser[0].image}.png`}
                alt="user"
                width="20%"
              />
            </div>
            <div className="container">
              <div className="d-flex justify-content-center">
                <h3 className="m-b-0">{currentUser[0].username}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <h6 className="border-bottom pb-2 mt-5" id="post-title">
            Posts
          </h6>
        </div>

        <div className="mb-3 rounded shadow-sm d-flex justify-content-center">
          <div className="col-sm-12 col-md-6 rounded bg-light shadow-sm">
            <div className="d-flex text-muted pt-3">
              <img
                className="postimg"
                src={`/stock/${currentUser[0].image}.png`}
                width="32"
                height="32"
              />

              <p className="pb-3 mb-0 small lh-sm border-bottom">
                <strong className="d-block text-gray-dark">
                  {currentUser[0].username}
                </strong>
                {currentUser[0].thoughts[0].thoughtText}
              </p>
            </div>

            <div className="d-flex text-muted pt-3">
              <p className="pb-3 mb-0 small lh-sm border-bottom">
                <strong className="d-block text-gray-dark">
                  {currentUser[0].thoughts[0].reactions[0].username}
                </strong>
                {currentUser[0].thoughts[0].reactions[0].reactionBody}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Profile;
