import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  project_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  issueTitle: {
    type: String,
    required: true,
  },
  issueDescription: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
});

const CommentModel = mongoose.model("comment", commentSchema);
export default CommentModel;
