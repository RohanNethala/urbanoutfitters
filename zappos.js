const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const URL = "https://www.zappos.com/p/mens-nike-sportswear-icon-futura-tee-magic-ember/product/9142933/color/842746"

let addToCartButtons = ['label[for="radio-111385-9142933"]', 'button[id="add-to-cart-button"]', 'button[class="OM-z"]']
let guestEmailInputs = [['input[data-testid="guestEmailInput"]', 'rnethbusi@gmail.com'], ['input[data-testid="guestConfirmEmailInput"]', 'rnethbusi@gmail.com']]
let inputs_for_shipping = [['input[data-testid="addressLine1"]', '305 Paxton Way'], ['input[data-testid="addressCity"]', 'Glastonbury'], ['input[data-testid="addressState"]', 'Connecticut'], ['input[data-testid="addressPostalCode"]', '06033'], ['input[data-testid="addressPhoneNumber"]', '860-471-5688']]
let inputs_for_payment = [['input[data-testid="nameOnCard"]', 'Rohan Nethala'], ['input[data-testid="cardNumber"]', '4111111111111111'], ['input[data-testid="expMonthYear"]', '12/25'], ['input[data-testid="cvv"]', '123']]
let buttons_for_payment = ['button[data-testid="reviewYourOrderButton"]', 'button[data-testid="placeOrderButton"]']

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
    for (let i = 0; i < addToCartButtons.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await waitForSelectorAndClick(page, addToCartButtons[i])
    }
}

async function enterGuestEmail(page){
    await page.waitForNavigation()
    await new Promise(resolve => setTimeout(resolve, 2000));
    await waitForSelectorAndClick(page, 'input[data-testid="guestEmailInput"]')
    for (let i = 0; i < guestEmailInputs.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await typeStuffIn(page, guestEmailInputs[i][0], guestEmailInputs[i][1])
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    await waitForSelectorAndClick(page, 'button[data-testid="continueAsGuest"]')
}

async function shipping(page){
    await page.waitForNavigation()
    await new Promise(resolve => setTimeout(resolve, 5000));
    await waitForSelectorAndClick(page, 'button[data-testid="creditCard"]')
    await new Promise(resolve => setTimeout(resolve, 5000));
    await typeStuffIn(page, 'input[data-testid="fullName"]', 'Rohan Nethala')
    await new Promise(resolve => setTimeout(resolve, 5000));
    await waitForSelectorAndClick(page, 'button[data-testid="enterAddressManually"]')
    await new Promise(resolve => setTimeout(resolve, 5000));
    for (let i = 0; i < inputs_for_shipping.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await typeStuffIn(page, inputs_for_shipping[i][0], inputs_for_shipping[i][1])
    }
    for (let i = 0; i < 2; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await waitForSelectorAndClick(page, 'button[data-testid="continueToPaymentButton"]')
    }
}

async function payment(page){
    await page.waitForNavigation()
    await new Promise(resolve => setTimeout(resolve, 5000));
    for (let i = 0; i < inputs_for_payment.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await typeStuffIn(page, inputs_for_payment[i][0], inputs_for_payment[i][1])
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    for (let i = 0; i < buttons_for_payment.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await waitForSelectorAndClick(page, buttons_for_payment[i])
        await page.waitForNavigation()
    }
}

async function run(){
    let page = await givePage();
    await page.goto(URL)
    await addToCart(page)
    await enterGuestEmail(page)
    await shipping(page)
    await payment(page)
}

run();