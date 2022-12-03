import Reaction from "./Reaction";

const Thought = (props) => {
  return (
    <>
      <div className="d-flex text-muted pt-3">
        <img
          className="postimg"
          src={`/stock/${props.item.image}.png`}
          width="32"
          height="32"
        />
        <div className="pb-3 mb-0 small lh-sm border-bottom">
          <strong className="d-block text-gray-dark">
            <a className="purple-color" href="/users/{{post.User.id}}">
              {props.item.name}
            </a>
          </strong>
          <span>{props.t.thoughtText}</span>

          {props.t.reactions.map((reaction, i) => {
            return <Reaction key={i} reaction={reaction} />;
          })}

          <button className="btn-comment btn-secondary">comment</button>
          <div id="commentArea-{{@index}}"></div>
        </div>
      </div>
    </>
  );
};

export default Thought;
