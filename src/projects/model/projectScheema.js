import mongoose from "mongoose";

const PorjectScheema = new mongoose.Schema({
    projectName:{
        type:String,
        require:true
    },
    projectDescription:{
        type:String,
        require:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    createdDate:{
        type:Date,
        default:Date.now(),
    },
    productIssues:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'issue'
    }]
})

const projectModel = mongoose.model('project',PorjectScheema);
export default projectModel;