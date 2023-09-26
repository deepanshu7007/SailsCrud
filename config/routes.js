/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // '/': { view: 'pages/homepage' },
  // delete and put
  // 'post /signup':  'ProductController.signup' ,
  'post /add': 'StudentController.add',
  'put /edit': 'StudentController.edit',
  'delete /delete': 'StudentController.delete',
  'get /display': 'StudentController.display',
  'get /display/sort': 'StudentController.displaySort',
  'get /display/limit': 'StudentController.displayLimit',
  'get /display/filter': 'StudentController.displayFilter',
  'get /display/page': 'StudentController.displayPage',
  'post /register/student' : "StudentController.registerStudet",
  'post /register/teacher' : "TeacherController.registerTeacher",
};
