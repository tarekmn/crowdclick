import Reaction from "./Reaction";
import { useAppContext } from "../utils/AppContext";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Thought = ({ item }) => {
  const { appState } = useAppContext();

  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState("");

  const createReaction = async (comment, thoughtid) => {
    await fetch(`/api/thoughts/${thoughtid}/reactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reactionBody: comment,
        thoughtId: thoughtid,
        userId: appState.user._id,
        username: appState.user.username,
      }),
    });

    window.location.href = "/";
  };

  const renderComment = (e) => {
    e.preventDefault();
    if (commenting && comment.length > 0) {
      createReaction(comment, e.target.dataset.thoughtid);

      // submit comment
      console.log(comment);
    }

    setCommenting(!commenting);
  };

  return (
    <>
      <div className="d-flex text-muted pt-3">
        <img
          className="postimg"
          src={`/stock/${item.user.image}.png`}
          alt="user smiling"
          width="32"
          height="32"
        />
        <div className="pb-3 mb-0 small lh-sm border-bottom">
          <strong className="d-block text-gray-dark">
            <h4
              style={{
                fontSize: "large",
                color: "black",
                paddingTop: "3px",
                marginBottom: 1,
              }}
            >
              {item.user.username}
            </h4>
          </strong>
          <span
            style={{
              fontSize: "medium",
              color: "black",
              textAlign: "center",
              paddingTop: "20px",
            }}
          >
            {item.thought.thoughtText}
          </span>{" "}
          <br></br>
          <span> {new Date(item.thought.createdAt).toLocaleString()}</span>
          {item.thought.reactions.map((reaction, i) => {
            return <Reaction key={i} reaction={reaction} />;
          })}
          <div
            style={{
              textAlign: "left",
            }}
          >
            {commenting && (
              <textarea
                onChange={(e) => setComment(e.target.value)}
                style={{
                  marginTop: "5px",
                }}
              ></textarea>
            )}
            <div
              style={{
                textAlign: "left",
              }}
            >
              <Button
                data-thoughtid={item.thought._id}
                variant="link"
                onClick={renderComment}
              >
                {commenting
                  ? comment.length === 0
                    ? "Cancel"
                    : "Submit"
                  : "Comment"}
              </Button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Thought;
