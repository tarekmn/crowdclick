import Reaction from "./Reaction";
import { useState } from "react";

const Thought = ({ item }) => {
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState("");

  const renderComment = (e) => {
    e.preventDefault();
    if (commenting && comment.length > 0) {
      // submit comment
      console.log({ comment });
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
            <a className="purple-color" href="/users/{{post.User.id}}">
              {item.user.username}
            </a>
          </strong>
          <span>{item.thought.thoughtText}</span>

          {item.thought.reactions.map((reaction, i) => {
            return <Reaction key={i} reaction={reaction} />;
          })}

          {commenting && (
            <textarea onChange={(e) => setComment(e.target.value)}></textarea>
          )}

          <button className="btn btn-primary" onClick={renderComment}>
            comment
          </button>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default Thought;
