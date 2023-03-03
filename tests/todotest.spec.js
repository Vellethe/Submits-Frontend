const { test, expect } = require('@playwright/test');

test('Adding a task', async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/Inlämning3/");
  let input = await page.locator('#userInput');
  let tasksList = await page.locator('#tasks');

  await input.type("Buy milk");
  await page.keyboard.press("Enter");

  let taskText = await tasksList.locator("li span").innerText();

  await expect(taskText).toEqual("Buy milk");
});

test('Add task and verify items left count', async ({ page }) => {

  await page.goto("http://127.0.0.1:5500/Inlämning3/");

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

  await page.goto("http://127.0.0.1:5500/Inlämning3/");

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