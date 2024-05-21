document.addEventListener("DOMContentLoaded", () => {
    let error_msg = document.querySelector(".error-message");
    const register_form = document.querySelector(".login-form");
  
    register_form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const data = Object.fromEntries(new FormData(event.target).entries());
  
      const email = data.email;
      const password = data.password;
  
      if (password.length < 6) {
        error_msg.innerHTML = "Password must be at least 6 characters";
      } else {
        error_msg.innerHTML = "";
        try {
          // Send email and password to server
          const response = await fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          if (response.status === 200) {
            window.location.href = "/dashboard";
          } else {
            error_msg.innerHTML = "Incorrect email or password.";
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  });
  