/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    add: async (req, res) => {
        try {
            const data = await Student.create(req.body).fetch();
            if (data) {
                return res.status(200).json({
                    code: 200,
                    success: true,
                    data: data
                })
            } else {
                console.log("Something went wrong");
            }
        } catch (val) {
            console.log(val);
        }
    }
    ,
    edit: async (req, res) => {
        try {
            const updatedUser = await Student.updateOne({ rollno: req.body.rollno })
                .set(req.body);
            if (updatedUser) {
                return res.status(200).json({
                    code: 200,
                    success: true,
                    data: req.body
                });
            } else {
                console.log("No record found for this UID")
            }
        }
        catch (val) {
            console.log(val);
        }
    }
    ,
    display: async (req, res) => {
        try {
            console.log("I am present");
            // var roll_no = req.body.rollno;
            var roll_no = req.param("rollno");
            console.log(roll_no);
            var data = await Student.findOne({
                rollno: roll_no
            });
            if (data) {
                return res.status(200).json({
                    code: 200,
                    success: true,
                    data: data
                });
            } else {
                console.log("No record found for this UID")
            }
        } catch (val) {
            console.log(val);
        }
    }
    ,
    delete: async (req, res) => {
        try {
            const data = await Student.destroyOne({ rollno: req.body.rollno });
            if (data) {
                return res.status(200).json({
                    code: 200,
                    success: true,
                    data: req.body
                });
            } else {
                console.log("No record found for this UID")
            }
        }
        catch (val) {
            console.log(val);
        }
    },
};

