const {supabase} = require("../config/supabaseClient");

exports.authenticate = async (request, response, next) => {
  // check if cookie exist
  const cookies = request.cookies;

  // check if cookies include token
  const token = cookies.token

  // Allow access to login and register routes without a token
  if (request.path === "/login" || request.path === "/register") {
    return next();
  }

  if (!token) {
    return response.redirect("/login");
  }

  try {
    const { data: session, error } = await supabase.auth.getUser(token);
    if (error) {
      throw new Error("Token does not work");
    }
    request.user = session.user;
    next();
  } catch (error) {
    return response
      .status(401)
      .send({ message: "Authentication failed: " + error.message });
  }
};
