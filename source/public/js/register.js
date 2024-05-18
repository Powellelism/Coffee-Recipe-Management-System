window.addEventListener("DOMContentLoaded", () => {
  const currentURL = window.location.pathname;
  const toggle = document.querySelector(".toggle");

  // If the route is '/register', open sign up form
  // If the route is '/login', open login form
  if (currentURL === "/register") {
    toggle.checked = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const back = document.querySelector(".flip-card-back");
  const register_form = back.querySelector(".flip-card-form");
  let error_msg = document.querySelector(".error-message");

  register_form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target).entries());

    const email = data.email;
    const password = data.password;
    const confirm_pass = data.confirm_pass;

    if (password !== confirm_pass) {
      error_msg.innerHTML = "Passwords do not match";
    } else if (password.length < 6) {
      error_msg.innerHTML = "Password must be at least 6 characters";
    } else {
      error_msg.innerHTML = "";
      try {
        // Send email and password to server
        const response = await fetch("/auth/register", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });

        const responseData = await response.json();

        if (response.status === 200) {
          window.location.href = "/dashboard";
        }
        else if (response.status === 402) {
          error_msg.innerHTML = responseData.error;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });
});
