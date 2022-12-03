const Reaction = (props) => {
  return (
    <div className="d-flex text-muted pt-3">
      <p className="pb-3 mb-0 small lh-sm border-bottom">
        <strong className="d-block text-gray-dark">
          <a className="purple-color" href="/users/{{comment.User.id}}">
            {props.reaction.username}
          </a>
        </strong>
        {props.reaction.reactionBody}
      </p>
    </div>
  );
};

export default Reaction;
