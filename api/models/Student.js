/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    cid:{
      type:"number",
      autoIncrement:true
    },
    name:{
      type:"string",
      required: true,
    },
    age:{
      type:"number",
      defaultsTo:18,
    },
    rollno:{
      type:"string",
      required: true,
      unique:true,
    },
    phoneNumber:{
      type:"string",
      allowNull:true
    },
    // teacherAlloted:{
    //   model:"teacher",
    // }
  },

};

