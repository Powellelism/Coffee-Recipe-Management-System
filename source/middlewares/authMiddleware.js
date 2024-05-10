const supabase = require('../config/supabaseClient');

exports.authenticate = async (request, response, next) => {
  const token = request.headers.authorization?.split(' ')[1];
  if (!token) {
    return response.status(401).send({ message: 'Did not get a token' });
  }
  try {
    const {data: session, error} = await supabase.auth.api.getUser(token);
    if (error) {
      throw new Error('Token does not work');
    }
    request.user = session.user;
    next();
  } catch (error) {
    return response.status(401).send({ message: 'Authentication failed: ' + error.message });
  }
};