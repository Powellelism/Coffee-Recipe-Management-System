/**
 * This test suite tests everything login and registration related to our website.
 */
describe("Test frontend and backend for logging in and registering", () => {
  it("Test logging into existing account", async () => {
    await page.goto("http://localhost:3000/login");
    // Type in email.
    await page.waitForSelector("#email");
    const emailInput = await page.$("#email");
    await emailInput.type("123@123.com");

    // Type in password.
    await page.waitForSelector("#password");
    const passwordInput = await page.$("#password");
    await passwordInput.type("PkfUgyrsLtQfFvS");

    // Login.
    await page.click('form-field button[type="submit"]');

    await page.waitForNavigation();
    const url = page.url();
    expect(url).toBe("http://localhost:3000/dashboard");
  }, 20000);

  it("Test logging into nonexistent account", async () => {
    await page.goto("http://localhost:3000/login");

    // Type in email that doesn't exist.
    await page.waitForSelector("#email");
    const emailInput = await page.$("#email");
    await emailInput.type("asldjkfalsk@aldskfjalsjdf.com");

    // Type in random password.
    await page.waitForSelector("#password");
    const passwordInput = await page.$("#password");
    await passwordInput.type("alsdkf:ALFj134e;alefj");

    // Attempt to Login.
    await page.click('form-field button[type="submit"]');

    // Error message should be seen
    await page.waitForSelector("output.error-message");
    const errorMessage = await page.$("output.error-message");
    let errorMessageText = await page.evaluate(
      (errorMessage) => errorMessage.textContent,
      errorMessage,
    );
    expect(errorMessageText).toBe("Incorrect email or password.");
  }, 30000);

  it("Test forgot password and redirect toward login", async () => {
    await page.goto("http://localhost:3000/login");

    // Click on forgot password button.
    await page.waitForSelector("a.forgot");
    const forgotPassword = await page.$("a.forgot");
    await forgotPassword.click();
    await page.waitForNavigation();

    const forgotURL = page.url();
    expect(forgotURL).toBe("http://localhost:3000/forgot");

    await page.waitForSelector("body > p:first-of-type");
    const forgotPasswordText = await page.$eval(
      "body > p:first-of-type",
      (el) => el.innerText,
    );
    expect(forgotPasswordText).toBe("TOO BAD, FIGURE IT OUT 😈");

    // Going back to login page works as well
    await page.waitForSelector('a[href="/login"]');
    const loginButton = await page.$('a[href="/login"]');
    await loginButton.click();
    await page.waitForNavigation();
    const loginURL = page.url();
    expect(loginURL).toBe("http://localhost:3000/login");
  }, 40000);
});
