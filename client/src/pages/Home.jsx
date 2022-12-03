import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";
import LogoSection from "../component/LogoSection";
import Thought from "../component/Thought";

const Home = (props) => {
  const { appState, justFriends } = useAppContext();

  useEffect(() => {
    if (!appState || !appState.user) {
      window.location.href = "/login";
    }
  }, [appState]);

  useEffect(() => {
    console.log(justFriends);
    console.log(appState.user._id);
  }, [justFriends]);

  const [userThought, setUserThought] = useState({
    thoughtText: "",
    username: appState.user._id,
  });
  const [userReaction, setUserReaction] = useState({});

  const createThought = async (req, res) => {
    const queryThought = await fetch("/api/thoughts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        thoughtText: userThought.thoughtText,
        username: userThought.username,
      }),
    });

    console.log(queryThought);
    // window.location.href = "/";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(userThought);
    console.log();
    createThought();
  };

  return (
    <>
      <main className="container">
        <LogoSection />

        <div className="my-3 p-3 bg-body bg-light rounded shadow-sm">
          <h6 className=" border-bottom pb-2 mb-0">Recent updates</h6>
          <form id="post-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <textarea
                name="thoughtText"
                id="post-content2"
                className="post-content2 mytextarea2 col-12"
                value={userThought.thoughtText}
                onChange={(e) =>
                  setUserThought({
                    ...userThought,
                    [e.target.name]: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Post
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
