const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://bradeac.dev/cv', {waitUntil: 'networkidle2'});
  const styles = await page.evaluate(() => {
    return {
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      bodyColor: window.getComputedStyle(document.body).color,
      fontFamily: window.getComputedStyle(document.body).fontFamily,
      terminalHeaderBg: document.querySelector('header') ? window.getComputedStyle(document.querySelector('header')).backgroundColor : null,
      accentColor: document.querySelector('.terminal-dot.green') ? window.getComputedStyle(document.querySelector('.terminal-dot.green')).backgroundColor : null,
      titleColor: document.querySelector('h1') ? window.getComputedStyle(document.querySelector('h1')).color : null,
    };
  });
  console.log(styles);
  await browser.close();
})();
