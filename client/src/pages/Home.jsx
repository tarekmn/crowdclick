import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";
import LogoSection from "../component/LogoSection";
import Thought from "../component/Thought";

const Home = (props) => {
  const { appState } = useAppContext();

  useEffect(() => {
    if (!appState || !appState.user) {
      window.location.href = "/login";
    }
  }, [appState]);

  const [newUsers, setNewUsers] = useState([]);
  const [justFriends, setJustFriends] = useState([]);

  // const { username, thoughts } = props.userData;
  const condenseUsers = () => {
    return props.userData.map((user) => {
      return {
        id: user._id,
        username: user.username,
        thoughts: user.thoughts,
      };
    });
  };

  useEffect(() => {
    if (props.userData && props.userData.length && !newUsers.length) {
      setNewUsers(condenseUsers());
    }
  }, [props.userData]);

  useEffect(() => {
    const friendIds = appState.user.friends;
    console.log(friendIds);
    //returns  ["637e83995dd421603e3e8163",  "637e83a133c49cd869012efc", "637e83a703d030945ab9fa60"]
    console.log(newUsers);
    //returns [ {id: '637e838129f498406df23181', username: 'Tarek', thoughts: Array(1)}, {user 2}, etc]

    const justFriends = newUsers.filter((user, i) =>
      friendIds.includes(user.id)
    );

    // const justFriends = newUsers.filter((users) =>
    //   users.id.includes("637e83995dd421603e3e8163")
    // );

    console.log(justFriends);
    //returns []   its empty

    // console.log(justFriends2);
    // //returns desired outcome for one person = [{id: '637e838129f498406df23181', username: 'Tarek', thoughts: Array(1)}]

    // const justFriends = newUsers.some((user) => friendIds.includes(user.id));

    setJustFriends(justFriends);
  }, [newUsers]);

  useEffect(() => {
    console.log(justFriends);
  }, [justFriends]);

  return (
    <>
      <main className="container">
        <LogoSection />

        <div className="my-3 p-3 bg-body bg-light rounded shadow-sm">
          <h6 className=" border-bottom pb-2 mb-0">Recent updates</h6>
          <form id="post-form">
            <div className="form-group">
              <textarea
                name="content1"
                id="post-content2"
                className="post-content2 mytextarea2 col-12"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

          {justFriends
            .filter((f) => f.thoughts.length > 0)
            .map((item, i) => (
              <div key={i}>
                <div className="d-flex text-muted pt-3">
                  <img
                    className="postimg"
                    src="{{post.User.image}}"
                    width="32"
                    height="32"
                  />
                  <div className="pb-3 mb-0 small lh-sm border-bottom">
                    <strong className="d-block text-gray-dark">
                      <a
                        className="purple-color"
                        href="/users/{{post.User.id}}"
                      >
                        {item.username}
                      </a>
                    </strong>

                    {item.thoughts.map((t, i) => (
                      <Thought key={i} i={i} t={t} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Home;
