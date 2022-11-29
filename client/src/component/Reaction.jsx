const Reaction = (props) => {
  return (
    <p className="pb-3 mb-0 small lh-sm border-bottom">
      <strong className="d-block text-gray-dark">
        <a className="purple-color" href="/users/{{comment.User.id}}">
          commentor:
        </a>
      </strong>
      {props.reaction.reactionBody}
    </p>
  );
};

export default Reaction;
