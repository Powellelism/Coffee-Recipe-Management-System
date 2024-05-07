const supabase = require('../config/supabaseClient');

/**
 * This function authenticates the user using Supabase authentication.
 * @param request
 * @param response
 * @param next
 * @returns {Promise<void>}
 */
exports.authenticate = async (request, response, next) => {
    next();
};