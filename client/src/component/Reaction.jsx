const Reaction = (props) => {
  const containerClass = "d-flex text-muted pt-3";
  const innerClass = "pb-3 mb-0 small lh-sm border-bottom";
  const strongClass = "d-block text-gray-dark";

  const reactionStyle = {
    fontSize: "small",
    color: "black",
    marginBottom: 0,
  };

  return (
    <div className={containerClass}>
      <div className={innerClass} style={reactionStyle}>
        <strong className={strongClass}>
          <p style={reactionStyle}>{props.reaction.username}</p>
        </strong>
        {`> ${props.reaction.reactionBody}`}
      </div>
    </div>
  );
};

export default Reaction;
