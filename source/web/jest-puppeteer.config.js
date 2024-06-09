module.exports = {
  launch: {
    headless: false,
    slowMo: 20,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-notifications",
      "--disable-infobars",
      "--disable-extensions",
      "--disable-popup-blocking",
      "--window-size=1920,1080",
    ],
  },
};
