const { test, expect } = require('@playwright/test');

test('Adding a task', async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/Inlämning3/");
  let input = await page.$('#userInput');
  let submitButton = await page.$('form button[type="submit"]');
  let tasksList = await page.$('#tasks');

  await input.type("Buy milk");
  await page.keyboard.press("Enter");

  let taskText = await tasksList.$("li span");
  await expect(taskText.innerText()).toEqual("Buy milk");
});

test('Add task and verify items left count', async ({ page }) => {

  await page.goto("http://127.0.0.1:5500/Inlämning3/");

  await page.fill("#userInput", "Task 1");

  await page.keyboard.press("Enter")('form button[type="submit"]');

  let taskDescription = await page.innerText(".tasks li span");
  expect(taskDescription).toBe("Task 1");

  let itemsLeft = await page.innerText(".itemsLeft");
  expect(itemsLeft).toBe('1 item left');

  await page.keyboard.press("Enter")('.tasks li input[type="checkbox"]');

  let updatedItemsLeft = await page.innerText('.itemsLeft');
  expect(updatedItemsLeft).toBe('0 items left');
});
