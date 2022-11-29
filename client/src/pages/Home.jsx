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
        image: user.image,
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
    // console.log(friendIds);

    const justFriends = newUsers.filter((user, i) =>
      friendIds.includes(user.id)
    );

    setJustFriends(justFriends);
  }, [newUsers]);

  useEffect(() => {
    // console.log(justFriends);
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
                    src={`/stock/${item.image}.png`}
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
