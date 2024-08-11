import mongoose from "mongoose";
import CommentModel from "./commentSchema.js";

class CommentRepository {
  add = async (project_Id, authorName, issueTitle, issueDescription) => {
    try {
      console.log(project_Id, authorName, issueTitle, issueDescription);
      
      const id = new mongoose.Types.ObjectId(project_Id)

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid project_Id format");
      }

      // Create a new comment instance
      const newComment = new CommentModel({
        project_Id:id,
        authorName:authorName,
        issueTitle:issueTitle,
        issueDescription:issueDescription
      });
  
      // Save the comment to the database
      const savedComment = await newComment.save();
      return savedComment;
  
    } catch (err) {
      console.error("Error adding comment:", err.message);
      throw new Error("Unable to add comment");
    }
  };


  
    findAllByPostId = async (postId) => {
        try {
            const newPostId = await new mongoose.Types.ObjectId(postId);
          const comments = await CommentModel.find({
            project_Id : newPostId,
          });
          return comments.length > 0 ? comments : null;
        } catch (err) {
          console.error(err);
          throw new Error("Unable to find comments by post ID");
        }
      };

}
export default CommentRepository;