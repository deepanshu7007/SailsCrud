/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    productName:{
      type:"string",
      required: true,
      // columnName: "product_name"
    },
    productAmount:{
      type:"number",
      required: true,
      // columnName: "product_amount"
    },
    createdAt:{
      type:"ref",
      autoCreatedAt: true
    },
    updatedAt:{
      type:"ref",
      autoUpdatedAt: true
    }
  },

};

