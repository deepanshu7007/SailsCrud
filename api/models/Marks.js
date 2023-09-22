/**
 * Marks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    rollno:{
      type:"string",
      unique:true,
      required:true
    },
    sub_marks:{
      type:"json"
    },
    total_marks:{
      type:"number"
    },
    student_status:{
      type:"string",
      isIn:["pass","fail"],
      defaultsTo:"pass",
    }
  },
};