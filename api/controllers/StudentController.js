/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const db = sails.getDatastore().manager;
module.exports = {
    add: async (req, res) => {
        try{
        const data = await Student.create(req.body).fetch();
        if(data){
        return res.status(200).json({
                code:200,
                success:true,
                data:data
        })
        }else{
            console.log("Something went wrong");
        }
    }catch(val){
        console.log(val);
    }
}
,
    edit: async (req,res) => {
        try{
            const updatedUser = await Student.updateOne({ rollno:req.body.rollno})
            .set(req.body);
        if(updatedUser){
            return res.status(200).json({
                code:200,
                success:true,
                data:req.body
            });
        }else{
            console.log("No record found for this UID")
        }
        }
        catch(val){
            console.log(val);
        }
    }
,
    display: async (req,res) => {
        try{
            var data = await Student.findOne({
                rollno:req.body.rollno
              });
        if(data){
            return res.status(200).json({
                code:200,
                success:true,
                data:req.body
            });
        }else{
            console.log("No record found for this UID")
        }
        }catch(val){
            console.log(val);
        }
    }
,
    delete: async (req,res) => {
        try{
            const data = await Student.destroyOne({rollno:req.body.rollno});
        if(data){
            return res.status(200).json({
                code:200,
                success:true,
                data:req.body
            });
        }else{
            console.log("No record found for this UID")
        }
        }
        catch(val){
            console.log(val);
        }
    }


};

