describe("Test frontend and backend for logging in and registering", () => {
  it("Test logging into existing account", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("#email");
    const emailInput = await page.$("#email");
    await emailInput.type("123@123.com");
    await page.waitForSelector("#password");
    const passwordInput = await page.$("#password");
    await passwordInput.type("PkfUgyrsLtQfFvS");
    await page.click('form-field button[type="submit"]');
    await page.waitForNavigation();
    const url = page.url();
    expect(url).toBe("http://localhost:3000/dashboard");
  }, 20000);

  it("Test logging into nonexistent account", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("#email");
    const emailInput = await page.$("#email");
    await emailInput.type("asldjkfalsk@aldskfjalsjdf.com");
    await page.waitForSelector("#password");
    const passwordInput = await page.$("#password");
    await passwordInput.type("alsdkf:ALFj134e;alefj");
    await page.click('form-field button[type="submit"]');
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
    await page.waitForSelector('a[href="/login"]');
    const loginButton = await page.$('a[href="/login"]');
    await loginButton.click();
    await page.waitForNavigation();
    const loginURL = page.url();
    expect(loginURL).toBe("http://localhost:3000/login");
  }, 40000);
});
