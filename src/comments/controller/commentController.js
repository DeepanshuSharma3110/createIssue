import CommentRepository from "../model/commentRepository.js";
import ProjectRepository from "../../projects/model/projectRepository.js";

class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository();
        this.projectRepository  = new ProjectRepository();
    }

    getAll= async(req,res)=>{

    }

    getAllByPostId = async (req, res) => {
        try {
         
          const postId = req.params.project_id;
          console.log("Valid post_id:", postId);
          const comments = await this.commentRepository.findAllByPostId(postId);
          console.log("Fetched comments:", comments);
          return res.status(200).render("pages/comment/comment", { comments });
        } catch (err) {
          console.error("Error fetching comments:", err);
          return res.status(500).send("Internal Server Error");
        }
      };
    



    getAdd = async(req,res)=>{
        try{
            const postId = req.params.project_id;  
            res.status(200).render('pages/comment/addComment',{title:'Add Comment', id:postId, error: null, login:req.cookies.user})
        }catch(err){
            console.log(err);
        }
    }

    getComment = async(req,res)=>{
      try{
        const postId = req.params.project_id;
        console.log(postId);
        const comments =await this.commentRepository.findAllByPostId(postId);
          if(comments){
            res.status(200).render('pages/comment/projectComment',{comments:comments, title:'Issues',error: null, login:req.cookies.user });
          }else{
            res.redirect('/')
          }
          
          return
      }catch(err){
        console.log(err);
        
      }
    }

    postAdd = async (req,res)=>{
      try{
        const {project_Id, authorName, issueTitle, issueDescription} = req.body;
        const result =await this.commentRepository.add(project_Id, authorName, issueTitle, issueDescription)

        if(result){
          const addId = await this.projectRepository.addCommentId(result);

          res.redirect('/');

        }return null;
      }catch(err){
        console.log(err);
      }
    }



}

export default CommentController;