describe("Test frontend and backend for logging in and registering", () => {
  it("Test logging into existing account", async () => {
    await page.goto("https://powellelism.site/login");
    await page.waitForSelector("#email");
    const emailInput = await page.$("#email");
    await emailInput.type("123@123.com");
    await page.waitForSelector("#password");
    const passwordInput = await page.$("#password");
    await passwordInput.type("123123");
    await page.click('form-field button[type="submit"]');
    await page.waitForNavigation();
    const url = page.url();
    expect(url).toBe("https://powellelism.site/dashboard");
  }, 20000);

  it("Test logging into nonexistent account", async () => {
    await page.goto("https://powellelism.site/login");
    await page.waitForSelector("#email");
    const emailInput = await page.$("#email");
    await emailInput.type("asldjkfalsk@aldskfjalsjdf.com");
    await page.waitForSelector("#password");
    const passwordInput = await page.$("#password");
    await passwordInput.type("123123");
    await page.click('form-field button[type="submit"]');
    await page.waitForSelector("output.error-message");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const errorMessage = await page.$eval(
      "output.error-message",
      (el) => el.innerText,
    );
    expect(errorMessage).toBe("Incorrect email or password.");
  });

  it("Test forgot password and redirect toward login", async () => {
    await page.goto("https://powellelism.site/login");
    await page.waitForSelector("a.forgot");
    const forgotPassword = await page.$("a.forgot");
    await forgotPassword.click();
    await page.waitForNavigation();
    const forgotURL = page.url();
    expect(forgotURL).toBe("https://powellelism.site/forgot");
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
    expect(loginURL).toBe("https://powellelism.site/login");
  }, 40000);
});
