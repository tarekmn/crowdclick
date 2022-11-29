import { useAppContext } from "../utils/AppContext";
import { useEffect, useState } from "react";

const Profile = (props) => {
  const { appState } = useAppContext();
  const [currentThoughts, setCurrentThoughts] = useState([]);
  // console.log(props.userData);
  const singleUser = props.userData ? props.userData : [];
  console.log("This is single USER : ", singleUser);
  const currentUser = singleUser.filter((users) =>
    users._id.includes(`${appState.user._id}`)
  );
  console.log("currentUser : ", currentUser);

  // useEffect(() => {
  //   console.log(props.userData);

  //   if (props.userData) {
  //     const currentUser = props.userData.filter((users) =>
  //       users._id.includes(`${appState.user._id}`)
  //     );

  //     setCurrentThoughts(currentUser);
  //   }

  //   // console.log(currentUser);
  // }, [props.userData]);

  // useEffect(() => {
  //   console.log(currentThoughts);
  // }, [currentThoughts]);
  // console.log(currentThoughts);
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

              <div className="d-flex justify-content-center">
                <a
                  href=""
                  className="m-t-10 waves-effect waves-dark btn btn-primary btn-md btn-rounded"
                  data-id="whatever"
                  id="follow"
                >
                  Follow
                </a>
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
                src="/images/arrow.jpg"
                width="32"
                height="32"
              />

              <p className="pb-3 mb-0 small lh-sm border-bottom">
                <strong className="d-block text-gray-dark">
                  Remember when you said...
                </strong>
                Content
              </p>
            </div>

            <div className="d-flex text-muted pt-3">
              <p className="pb-3 mb-0 small lh-sm border-bottom">
                <strong className="d-block text-gray-dark">
                  And then
                  <a className="purple-color" href="/users/{{comment.User.id}}">
                    commenters first name
                  </a>
                  said...
                </strong>
                comment content
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Profile;
