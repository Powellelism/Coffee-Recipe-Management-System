const supabase = require('../config/supabaseClient');

exports.authenticate = async (request, response, next) => {
    // Check if token is provided in the request headers or cookies
    const token = request.headers.authorization || request.cookies.token;

    // If no token is provided, redirect the user to the login page
    if (token) {
        response.redirect('/login');
        return;
    }

    try {
        // Verify the user's authentication token using Supabase authentication
        const { user, error } = await supabase.auth.getUser(token);

        if (!error) {
            // If the token is valid, attach the authenticated user to the request object
            request.user = user;

            // Pass control to the next middleware/route handler
            next();
        }
    } catch (error) {
        response.redirect('/login');
    }
};