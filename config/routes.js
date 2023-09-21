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
  // 'post /signup':  'ProductController.signup' ,
  'post /add': 'ProductController.add',
  'post /edit': 'ProductController.edit',
  'post /delete': 'ProductController.delete',
  'post /display': 'ProductController.display'
};
