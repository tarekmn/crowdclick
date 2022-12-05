const Reaction = (props) => {
  return (
    <div className="d-flex text-muted pt-3">
      <div
        className="pb-3 mb-0 small lh-sm border-bottom"
        style={{
          fontSize: "small",
          color: "black",
          marginBottom: 0,
        }}
      >
        <strong className="d-block text-gray-dark">
          <p
            style={{
              fontSize: "small",
              color: "black",
              marginBottom: 0,
            }}
          >
            {props.reaction.username}
          </p>
        </strong>
        {">"} {props.reaction.reactionBody}
      </div>
    </div>
  );
};

export default Reaction;
