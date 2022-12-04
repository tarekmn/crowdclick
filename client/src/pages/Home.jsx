import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";
import LogoSection from "../component/LogoSection";
import Thought from "../component/Thought";

const Home = (props) => {
  const { appState, justFriends, currentUser } = useAppContext();

  const friendsAndMe = [...justFriends, currentUser[0]];
  // console.log(currentUser[0]);
  // console.log(friendsAndMe);

  useEffect(() => {
    if (!appState || !appState.user) {
      window.location.href = "/login";
    }
  }, [appState]);

  // useEffect(() => {
  //   console.log(justFriends);
  //   console.log(appState.user._id);
  // }, [justFriends]);

  // console.log(currentUser[0].thoughts);

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

  const updateUser = async (req, res) => {
    const queryUser = await fetch(`/api/users/${appState.user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        thoughts: "638bae5937f3d6d1fb5e57ad",
      }),
    });

    console.log(queryUser);
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

          {friendsAndMe.every((user) => user !== undefined) &&
            friendsAndMe
              .filter((f) => f.thoughts?.length > 0)
              .map((user) => {
                return user.thoughts.map((thought) => {
                  console.log(thought.createdAt);
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
