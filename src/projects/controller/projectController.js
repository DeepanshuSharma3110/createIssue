import ProjectRepository from "../model/projectRepository.js";


class ProjectController{
    constructor(){
        this.projectRepository = new ProjectRepository();
    }

    postAdd = async(req,res)=>{
        const {projectName, projectDescription} = req.body;
        const userId = req.cookies.user;
       // console.log(`userId ${userId}, projectName ${projectName}, projectDescription ${projectDescription}`);
        const project = await this.projectRepository.add(projectName, projectDescription, userId)
        if(project){
            res.redirect('/');
        }
    }

    getAdd = (req,res)=>{
            return res.status(200).render('pages/projects/projects',{title:'Add Projects',error : null, login:req.cookies.user });
    }


    all = async(req,res)=>{
        const projects = await this.projectRepository.findAll();
       
        if(projects){
            res.status(200).render('pages/home/home',{projects:projects, error:null, title:'createIssue',userId:req.cookies.user, login:req.cookies.user});
        }
    }
    deleteProject = async(req,res)=>{
        const productId = req.params.project_id;
        console.log(productId);
        
         await this.projectRepository.delete(productId)
         res.redirect('/');
    }

}
export default ProjectController;