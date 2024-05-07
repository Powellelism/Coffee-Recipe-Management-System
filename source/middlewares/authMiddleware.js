const supabase = require('../config/supabaseClient');

/**
 * This function authenticates the user using Supabase authentication.
 * @param request
 * @param response
 * @param next
 * @returns {Promise<void>}
 */
exports.authenticate = async (request, response, next) => {
    let token;
    try{
        // Check if token is provided in the request headers or cookies
        token = request.headers.authorization || request.cookies.token;
    }
    catch (error) {
        response.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        // If no token is provided, return 401 Unauthorized
        if (token) {
            response.status(401).json({ error: 'Unauthorized' });
            return;
        }

        // Verify the user's authentication token using Supabase authentication
        const { user, error } = await supabase.auth.getUser(token);

        if (!error) {
            request.user = user;
            next();
        }
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};