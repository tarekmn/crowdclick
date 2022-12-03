import Reaction from "./Reaction";

const Thought = (props) => {
  return (
    <>
      <span>{props.t.thoughtText}</span>

      {props.t.reactions.map((reaction, i) => {
        return <Reaction key={i} reaction={reaction} />;
      })}

      <button className="btn-comment btn-secondary">comment</button>
      <div id="commentArea-{{@index}}"></div>
    </>
  );
};

export default Thought;
