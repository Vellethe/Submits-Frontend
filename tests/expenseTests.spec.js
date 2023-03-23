
const { test, expect } = require('@playwright/test');

test('Adding expense', async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/Inlämning4/");
  let nameFeild = await page.locator('#name');
  let costFeild = await page.locator('#amount');
  let categorySelector = await page.locator('#category');
  let dateFeild = await page.locator('#date');
  let submitButton = await page.locator('[type=submit]');

  let totalSpent = await page.locator('.totalSpent');

  await nameFeild.fill("rent");
  await costFeild.fill("20");
  await categorySelector.selectOption("Housing");
  await dateFeild.fill('2023-05-11'); 
  
  await submitButton.click();

  let spentValue = await totalSpent.textContent();
  await expect(spentValue).toEqual("60 kr");
  //await page.keyboard.press("Enter");


});

test('Add task and verify items left count', async ({ page }) => {

  await page.goto("http://127.0.0.1:5500/Inlämning4/");

  let input = await page.locator('#userInput');
  let tasksList = await page.locator('#tasks');
  let itemsLeft = await page.locator(".itemsLeft")

  await input.type("Buy milk");
  await page.keyboard.press("Enter");

  let itemsLeftText = await itemsLeft.innerText();
  await expect(itemsLeftText).toEqual("1 item left")

  let checkbox = await tasksList.locator("li input");
  await checkbox.check();

  itemsLeftText = await itemsLeft.innerText();
  await expect(itemsLeftText).toEqual("0 items left")
});

test('Add 3 tasks and check so that number of tasks works', async ({page}) =>{

  await page.goto("http://127.0.0.1:5500/Inlämning4/");

  let input = await page.locator('#userInput');
  let tasksList = await page.locator('#tasks');
  let itemsLeft = await page.locator(".itemsLeft")

  await input.type("Buy milk");
  await page.keyboard.press("Enter");

  await input.type("Buy butter");
  await page.keyboard.press("Enter");

  await input.type("Buy sugar");
  await page.keyboard.press("Enter");
  
 
  let checkbox = await tasksList.locator("li:first-child input");
  await checkbox.check();

  let itemsLeftText = await itemsLeft.innerText();

  await expect(itemsLeftText).toEqual("2 items left")

})