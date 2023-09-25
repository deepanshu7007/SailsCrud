/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { log } = require("grunt");
function responseStatus(data,res) {
    if (data) {
        return res.status(200).json({
            code: 200,
            success: true,
            data: data
        });
    } else {
        return res.status(404).json({
            code: 404,
            success: false,
            data: { err:"Something went Wrong" }
        });
    }
}
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
            }
        } catch (err) {
            console.log(err);
        }
    },
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
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    delete: async (req, res) => {
        try {
            const data = await Student.destroyOne({ rollno: req.body.rollno });
            if (data) {
                return res.status(200).json({
                    code: 200,
                    success: true,
                    data: req.body
                });
            }
        } catch (err) {
            return (err);
        }
    },
    display: async (req, res) => {
        try {
            var rol = req.param("rollno");
            var data = await Student.findOne({
                rollno: rol
            });
            responseStatus(data);
        } catch (val) {
            return val;
        }
    },
    displaySort: async (req, res) => {
        try {
            var field = req.param("field");
            var mode = req.param("mode");
            var data = await Student.find({}).sort(
                `${field} ${mode}`
            );
            responseStatus(data);
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    displayLimit: async (req, res) => {
        try {
            var to = Number(req.param("to"));
            var from = Number(req.param("from"));
            if (isNaN(from) || isNaN(to)) {
                throw "Something wrong with these params";
            }
            const length = await Student.find({});
            var too = length.length - to;
            var data = await Student.find({}).skip(from - 1).limit(too);
            responseStatus(data);
        } catch (err) {
            return res.status(404).json({
                code: 404,
                success: false,
                data: { err }
            });
        }
    },
    displayFilter: async (req, res) => {
        try {
            var field = req.param("field");
            var symbol = req.param("symbol");
            var value = req.param("value");
            var data = await Student.find({
                field:{symbol:value}
            });
            responseStatus(data);
        } catch (err) {
            res.status(404).json({
                code: 404,
                success: false,
                data: { err }
            });
        }
    },
    displayPage: async (req, res) => {
        try {
            var pageNumber = Number(req.param("pgNo"));
            if (pageNumber < 1 || isNaN(pageNumber) || pageNumber > 100) {
                throw "Invalid range for page number";
            } else {
                if (pageNumber == 1) {
                    const data = await Student.find({}).limit(2);
                    responseStatus(data,res);
                } else {
                    const data = await Student.find({}).skip((pageNumber - 1) * 2).limit(2);
                    responseStatus(data,res);
                }
            }
        } catch (err) {
            return res.status(404).json({
                code: 404,
                success: false,
                data: { err }
            });
        }
    },
};

