const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const URL = "https://www.zappos.com/p/mens-nike-sportswear-icon-futura-tee-magic-ember/product/9142933/color/842746"

function waitForSelectorAndClick(page, selector){
    page.waitForSelector(selector).then(() => {
        page.click(selector)
    })
}

function typeStuffIn(page, selector, text){
    page.waitForSelector(selector).then(() => {
        page.type(selector, text)
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    await waitForSelectorAndClick(page, 'button[id="add-to-cart-button"]')
    await waitForSelectorAndClick(page, 'button[class="bN-z"]')


}

async function enterGuestEmail(page){
    await page.waitForNavigation()
    await new Promise(resolve => setTimeout(resolve, 2000));

    await waitForSelectorAndClick(page, 'input[data-testid="guestEmailInput"]')
    await typeStuffIn(page, 'input[data-testid="guestEmailInput"]', "rnethbusi@gmail.com")
    await new Promise(resolve => setTimeout(resolve, 5000));
    await typeStuffIn(page, 'input[data-testid="guestConfirmEmailInput"]', "rnethbusi@gmail.com")
    await new Promise(resolve => setTimeout(resolve, 2000));
    await waitForSelectorAndClick(page, 'button[data-testid="guestSubscriptionCheckbox"]')
    await waitForSelectorAndClick(page, 'button[data-testid="continueAsGuest"]')
}

async function checkout(page){
    await page.waitForNavigation()
    await new Promise(resolve => setTimeout(resolve, 2000));
    await waitForSelectorAndClick(page, 'button[data-testid="creditCard"]')
    await waitForSelectorAndClick(page, 'button[data-testid="continueAsGuest"]')
}

async function run(){
    let page = await givePage();
    await page.goto(URL)
    await addToCart(page)
    await enterGuestEmail(page)
}

run();