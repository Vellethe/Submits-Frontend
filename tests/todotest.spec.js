const { test, expect } = require('@playwright/test');

test('Adding a task', async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/Inlämning3/");
  let input = await page.locator('#userInput');
  let submitButton = await page.locator('form button[type="submit"]');
  let tasksList = await page.locator('#tasks');

  await input.type("Buy milk");
  await page.keyboard.press("Enter");

  let taskText = await tasksList.locator("li span").innerText();

  await expect(taskText).toEqual("Buy milk");
});

test('Add task and verify items left count', async ({ page }) => {

  await page.goto("http://127.0.0.1:5500/Inlämning3/");

  await page.fill("#userInput", "Task 1");

  await page.keyboard.press("Enter")('form button[type="submit"]');

  let taskDescription = await page.innerText(".tasks li span");
  expect(taskDescription).toEqual("Task 1");

  let itemsLeft = await page.innerText(".itemsLeft");
  expect(itemsLeft).toEqual('1 item left');

  await page.keyboard.press("Enter")('.tasks li input[type="checkbox"]');

  let updatedItemsLeft = await page.innerText('.itemsLeft');
  expect(updatedItemsLeft).toEqual('0 items left');
});
