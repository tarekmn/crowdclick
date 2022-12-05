const { Schema, model, Types } = require("mongoose");


//creating reactionSchema
const reactionSchema = new Schema(
  {

    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    thoughtId: {
      type: String,
      ref: "Thought",
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true,
  }
);

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;
