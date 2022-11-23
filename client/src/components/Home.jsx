import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";

const Home = (props) => {
  const { appState, lookupUser } = useAppContext();

  useEffect(() => {
    if (!appState || !appState.user) {
      window.location.href = "/login";
    }
  }, [appState]);

  const [newUsers, setNewUsers] = useState([]);

  // deconstruct thoughts/reactions so its controllable. then implement post apis here for deletes and additions?

  // const { username, thoughts } = props.userData;
  const condenseUsers = () => {
    return props.userData.map((user) => {
      return {
        username: user.username,
        thoughts: user.thoughts,
      };
    });
  };

  useEffect(() => {
    if (newUsers.length) console.log(newUsers);
  }, [newUsers]);

  useEffect(() => {
    if (props.userData && props.userData.length && !newUsers.length) {
      setNewUsers(condenseUsers());
    }
  }, [props.userData]);

  // console.log(newUsers);

  return (
    <>
      <main className="container">
        <div>
          <div className="d-flex justify-content-center">
            <img
              className="m-3"
              src="logo-no-background.png"
              alt=""
              width="210"
              height="140"
            />
          </div>
        </div>
        <div className="my-3 p-3 bg-body bg-light rounded shadow-sm">
          <h6 className="purple-color border-bottom pb-2 mb-0">
            Recent updates
          </h6>
          <form id="post-form">
            <div className="form-group">
              <textarea
                name="content1"
                id="post-content2"
                className="post-content2 mytextarea2"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

          <div className="d-flex text-muted pt-3">
            <img
              className="postimg"
              src="{{post.User.image}}"
              width="32"
              height="32"
            />
            <p className="pb-3 mb-0 small lh-sm border-bottom">
              <strong className="d-block text-gray-dark">
                Did you hear that
                <a className="purple-color" href="/users/{{post.User.id}}">
                  Tarek{" "}
                </a>
                said...
              </strong>
              Content
            </p>
          </div>

          <div className="d-flex text-muted pt-3">
            <p className="pb-3 mb-0 small lh-sm border-bottom">
              <strong className="d-block text-gray-dark">
                And then
                <a className="purple-color" href="/users/{{comment.User.id}}">
                  commentor
                </a>
                said...
              </strong>
              content
            </p>
          </div>

          <button className="btn-comment btn-secondary">comment</button>
          <div id="commentArea-{{@index}}"></div>
        </div>
      </main>
    </>
  );
};

export default Home;
