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
        const data = await Product.create(req.body).fetch();
        if(data){
            console.log(data);
        return res.status(200).json({
                code:200,
                success:true,
                data:data
        })
        }
    }catch(val){
        console.log(val);
    }
}
};

