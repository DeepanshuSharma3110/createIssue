
import projectModel from "./projectScheema.js";

class ProjectRepository{

    findAll = async()=>{
        try{
            const project  =  await projectModel.find();
            if(project) return project;
            return null
        }catch(err){
            throw new Error('unable to find product from the database');
        }
    }   
    add = async(projectName, projectDescription, userId)=>{
        try{
            const newProject = new projectModel({
                projectName,
                projectDescription,
                userId
            });
            
            const saveProducts = await newProject.save();
            if(saveProducts) return saveProducts
            return null;
        }catch(err){
            throw new Error('unable to add products to the database');
        }
    }

    delete = async(productId)=>{
            await projectModel.findByIdAndDelete(productId);
            return;
    }


    addCommentId = async(comment)=>{
        const projectId = await projectModel.findById( comment.project_Id)
        console.log('found the id in project repository', projectId);
        projectId.productIssues.push(comment._id); 
        projectId.save();
    }

}
export default ProjectRepository;