import Reaction from "./Reaction";
import Link from "react-bootstrap/Nav";
import { useAppContext } from "../utils/AppContext";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Thought = ({ item }) => {
  const { appState } = useAppContext();

  const likesOnComment = item.thought.likers.length;

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
      createReaction(comment, item.thought._id);

      // submit comment
      console.log(comment);
    }

    setCommenting(!commenting);
  };

  const divClass = "d-flex text-muted pt-3";
  const div2Class = "pb-3 mb-0 small lh-sm border-bottom";
  const strongClass = "d-block text-gray-dark";
  const h4Style = {
    fontSize: "large",
    color: "black",
    paddingTop: "3px",
    marginBottom: 1,
  };

  const spanStyle = {
    fontSize: "medium",
    color: "black",
    textAlign: "center",
    paddingTop: "20px",
  };

  const getButtonLabel = () =>
    commenting ? (comment.length === 0 ? "Cancel" : "Submit") : "Comment";

  const plusOne = async (e) => {
    e.preventDefault();
    console.log(item.thought._id);

    await fetch(`/api/thoughts/like/${item.thought._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: appState.user._id,
      }),
    });

    window.location.href = "/";
  };

  return (
    <>
      <div className={divClass}>
        <img
          className="postimg"
          src={`/stock/${item.user.image}.png`}
          alt="user smiling"
          width="32"
          height="32"
        />
        <div className={div2Class}>
          <strong className={strongClass}>
            <h4 style={h4Style}>{item.user.username}</h4>
            <span> {new Date(item.thought.createdAt).toLocaleString()} </span>
          </strong>
          <span style={spanStyle}>{item.thought.thoughtText}</span> <br></br>
          <Link onClick={plusOne}>
            <FontAwesomeIcon
              icon={faThumbsUp}
              size="2x"
              style={{ color: "red" }}
            />
          </Link>{" "}
          {likesOnComment}
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
              <Button variant="link" onClick={renderComment}>
                {getButtonLabel()}
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
