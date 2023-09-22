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
  'post /edit': 'StudentController.edit',
  'post /delete': 'StudentController.delete',
  'get /display': 'StudentController.display'
};
