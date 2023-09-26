
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
    displayNewFilter: async (req, res)=>{
        try {
            var search = req.param('search');
            var isDeleted = req.param('isDeleted');
            var page = req.param('page');
            var count = parseInt(req.param('count'));
            let sortBy = req.param("sortBy");
            // let addedBy = req.param('addedBy');
            var query = {};
            if (search) {
                query.$or = [
                    { name: { $regex: search, '$options': 'i' } },
                    { email: { $regex: search, '$options': 'i' } }
                ]
            }
           
           
           /*
           * This code is used to check which field,
           * what sort order is used to sort.
           */
            let sortquery = {};
            if (sortBy) {
                let typeArr = [];
                typeArr = sortBy.split(" ");
                let sortType = typeArr[1];
                let field = typeArr[0];
                sortquery[field ? field : 'updatedAt'] = sortType ? (sortType == 'desc' ? -1 : 1) : -1;
            } else {
                sortquery = { updatedAt: -1 }
            }

            /*
            * this is used to list the record which are deleted or not.
            */           
           
            if (isDeleted) {
                if (isDeleted === 'true') {
                    isDeleted = true;
                } else {
                    isDeleted = false;
                }
                query.isDeleted = isDeleted;
            } else {
                query.isDeleted = false;
            }

            

            if (addedBy) {
                query.addedBy_id = ObjectId(addedBy);
            }

            const pipeline = [
                {
                    $project: {
                        name: "$name",
                        image: "$image",
                        
                    }
                },
                {
                    $match: query
                },
                {
                    $sort: sortquery
                },
            ]
            db.collection('student').aggregate([...pipeline]).toArray((err, totalResult) => {
                if (page && count) {
                    var skipNo = (page - 1) * count;
                    pipeline.push(
                        {
                            $skip: Number(skipNo)
                        },
                        {
                            $limit: Number(count)
                        })
                }
                db.collection('student').aggregate([...pipeline]).toArray((err, result) => {
                    return res.status(200).json({
                        "success": true,
                        "data": result,
                        "total": totalResult.length,
                    });
                })
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                error: { code: 400, message: "" + err }
            })
        }
    }
};

