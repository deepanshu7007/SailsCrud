/**
 * Teacher.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  table_name: "Teacher_Details",
  attributes: {
    
    teacher_name: {
      type: "string",
    },
    t_id: {
      type: "string"
    },
    teacher_qualification: {
      type: "string"
    },
    teacher_age: {
      type: "number"
    },
    teacher_subject: {
      type: "string"
    },
    teacher_experience: {
      type: "number"
    },
    teacher_age: {
      type: "number"
    },
    teacher_email: {
      type: "string"
    },
    teacher_designation: {
      type: "string"
    },
    teacher_image: {
      type: "string"
    }
  },
};

