import Reaction from "./Reaction";

const Thought = (props) => {
  return (
    <>
      <span>{props.t.thoughtText}</span>
      <div className="d-flex text-muted pt-3">
        {props.t.reactions.map((reaction, i) => {
          return <Reaction key={i} reaction={reaction} />;
        })}
      </div>

      <button className="btn-comment btn-secondary">comment</button>
      <div id="commentArea-{{@index}}"></div>
    </>
  );
};

export default Thought;
