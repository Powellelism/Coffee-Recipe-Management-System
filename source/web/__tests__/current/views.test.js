describe("Testing unauthenticated views", () => {
  it("Testing serve index view", async () => {
    const response = await page.goto("http://localhost:3000/");
    const status = response.status();
    expect([200, 304]).toContain(status);
  }, 20000);

  it("Testing serve about us view", async () => {
    const response = await page.goto("http://localhost:3000/about");
    const status = response.status();
    expect([200, 304]).toContain(status);
  }, 20000);

  it("Testing serve login view", async () => {
    const response = await page.goto("http://localhost:3000/login");
    const status = response.status();
    expect([200, 304]).toContain(status);
  }, 20000);

  it("Testing serve register view", async () => {
    const response = await page.goto("http://localhost:3000/register");
    const status = response.status();
    expect([200, 304]).toContain(status);
  }, 20000);

  it("Testing serve forgot password view", async () => {
    const response = await page.goto("http://localhost:3000/forgot");
    const status = response.status();
    expect([200, 304]).toContain(status);
  }, 20000);
});

describe("Testing authenticated views", () => {
  const login = async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("#email");
    const emailInput = await page.$("#email");
    await emailInput.type("123@123.com");
    await page.waitForSelector("#password");
    const passwordInput = await page.$("#password");
    await passwordInput.type("PkfUgyrsLtQfFvS");
    await page.click('form-field button[type="submit"]');
    await page.waitForNavigation();
  };

  it("Testing serve dashboard view", async () => {
    await login();
    const response = await page.goto("http://localhost:3000/dashboard");
    const status = response.status();
    expect([200, 304]).toContain(status);
  }, 20000);

  it("Testing serve recipe customization view", async () => {
    await login();
    const response = await page.goto("http://localhost:3000/recipe/customize");
    const status = response.status();
    expect([200, 304]).toContain(status);
  }, 20000);

  it("Testing serve recipe review view", async () => {
    await login();
    const response = await page.goto("http://localhost:3000/recipe/review");
    const status = response.status();
    expect([200, 304]).toContain(status);
  }, 20000);
});

describe("Testing views that don't exist", () => {
  it("Testing serve non-existent view", async () => {
    const response = await page.goto("http://localhost:3000/thisdoesnotexist");
    const status = response.status();
    expect(status).toBe(404);
  }, 20000);

  it("Testing previous, but now deleted view: /common/home", async () => {
    const response = await page.goto("http://localhost:3000/common/home");
    const status = response.status();
    expect(status).toBe(404);
  });

  it("Testing previous, but now deleted view: /preset/customize", async () => {
    const response = await page.goto("http://localhost:3000/preset/customize");
    const status = response.status();
    expect(status).toBe(404);
  });

  it("Testing previous, but now deleted view: /preset/list", async () => {
    const response = await page.goto("http://localhost:3000/preset/list");
    const status = response.status();
    expect(status).toBe(404);
  });
});
