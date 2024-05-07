const supabase = require('../config/supabaseClient');

/**
 * This function logs the user in using Supabase authentication.
 * if login is successful, a token is set in the cookie.
 * else an error message is returned.
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
exports.login = async (request, response) => {
    const { email, password } = request.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Login error:', error);
            response.status(401).json({ error: 'Invalid credentials' });
        } else {
            if (data.session && data.session.access_token) {
                const token = data.session.access_token;
                response.cookie('token', token, { httpOnly: true, secure: true });
                response.redirect('/dashboard');
            }
            else {
                console.error('Login error: Session or access token missing');
                response.status(500).json({error: 'Login failed. Please try again.'});
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * This function registers the user using Supabase authentication.
 * if registration is successful, a token is set in the cookie.
 * else an error message is returned.
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
exports.register = async (request, response) => {
    const { email, password } = request.body;

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error('Registration error:', error);
            response.status(400).json({ error: 'Registration failed' });
        } else {
            if (data.session && data.session.access_token) {
                const token = data.session.access_token;
                response.cookie('token', token, { httpOnly: true, secure: true });
                response.redirect('/dashboard');
            } else {
                console.error('Registration error: Session or access token missing');
                response.status(500).json({ error: 'Registration failed. Please try again.' });
            }
        }
    } catch (error) {
        console.error('Registration error:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};