import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";
import LogoSection from "../component/LogoSection";
import Thought from "../component/Thought";

const Home = (props) => {
  const { appState, justFriends, currentUser } = useAppContext();

  const friendsAndMe = [...justFriends, currentUser[0]];

  useEffect(() => {
    if (!appState || !appState.user) {
      window.location.href = "/login";
    }
  }, [appState]);

  const [userThought, setUserThought] = useState({
    thoughtText: "",
    username: appState.user._id,
  });

  const createThought = async (req, res) => {
    await fetch("/api/thoughts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        thoughtText: userThought.thoughtText,
        username: userThought.username,
      }),
    });

    window.location.href = "/";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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

          {friendsAndMe.every((user) => user !== undefined) &&
            friendsAndMe
              .filter((f) => f.thoughts?.length > 0)
              .map((user) => {
                return user.thoughts.map((thought) => {
                  return {
                    thought: thought,
                    user: user,
                  };
                });
              })
              .flat()
              .sort(
                (a, b) =>
                  new Date(b.thought.createdAt) - new Date(a.thought.createdAt)
              )
              .map((item, i) => <Thought key={i} item={item} i={i} />)}
        </div>
      </main>
    </>
  );
};

export default Home;
