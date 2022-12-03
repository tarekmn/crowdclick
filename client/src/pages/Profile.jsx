import { useAppContext } from "../utils/AppContext";
import { useEffect, useState } from "react";
import Thought from "../component/Thought";

const Profile = (props) => {
  const { appState, currentUser } = useAppContext();

  console.log(currentUser[0]);

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

        {currentUser[0].thoughts.map((thought, i) => {
          const item = { thought, user: currentUser[0] };
          return <Thought key={i} item={item} i={i} />;
        })}
      </>
    );
  }
};

export default Profile;
