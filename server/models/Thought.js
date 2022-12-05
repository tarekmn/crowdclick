const { Schema, model, Types } = require("mongoose");


//creating thoughtSchema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    likers: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    username: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactions: [
      {
        type: Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
