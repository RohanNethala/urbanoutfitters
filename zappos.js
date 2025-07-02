const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const URL = "https://www.zappos.com/p/mens-nike-sportswear-icon-futura-tee-magic-ember/product/9142933/color/842746"

function waitForSelectorAndClick(page, selector){
    page.waitForSelector(selector).then(() => {
        page.click(selector)
    })
}

async function givePage(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    return page;
}



async function addToCart(page){
    await new Promise(resolve => setTimeout(resolve, 2000));

    await waitForSelectorAndClick(page, 'label[for="radio-111385-9142933"]')
    await waitForSelectorAndClick(page, 'button[id="add-to-cart-button"]')
    await waitForSelectorAndClick(page, 'button[class="bN-z"]')
    
}

async function run(){
    let page = await givePage();
    await page.goto(URL)
    await addToCart(page)
}

run();