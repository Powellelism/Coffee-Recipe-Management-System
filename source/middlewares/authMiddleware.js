//const supabase = require('../config/supabaseClient');

/**
 * This function authenticates the user using Supabase authentication.
 * @param request
 * @param response
 * @param next
 * @returns {Promise<void>}
 */
exports.authenticate = async (request, response, next) => {
  // right now, we are not using this middleware for anything all the routes are public
  // we should check if token is valid and if user is logged in to serve the next route
  next();
  // suppress the eslint warning that supabase is not used will be used to authenticate user by commenting line 1
  // assignee should uncomment line 1 and implement the authentication logic
};
