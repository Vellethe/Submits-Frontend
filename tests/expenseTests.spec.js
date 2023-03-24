
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

});

test('delete all button', async ({ page }) => {

  await page.goto("http://127.0.0.1:5500/Inlämning4/");
  let nameFeild = await page.locator('#name');
  let costFeild = await page.locator('#amount');
  let categorySelector = await page.locator('#category');
  let dateFeild = await page.locator('#date');
  let submitButton = await page.locator('[type=submit]');
  let deleteAllButton = await page.locator('#deleteAllButton');

  let totalSpent = await page.locator('.totalSpent');


  await deleteAllButton.click();
  let spentValue = await totalSpent.textContent();
  await expect(spentValue).toEqual("0 kr");

  });


test('filter on month', async ({page}) =>{

  await page.goto("http://127.0.0.1:5500/Inlämning4/");
  let nameFeild = await page.locator('#name');
  let costFeild = await page.locator('#amount');
  let categorySelector = await page.locator('#category');
  let dateFeild = await page.locator('#date');
  let submitButton = await page.locator('[type=submit]');
  let deleteAllButton = await page.locator('#deleteAllButton');
  let monthSelector = await page.locator('#monthToShow');

  let totalSpent = await page.locator('.totalSpent');
  
  await nameFeild.fill("rent");
  await costFeild.fill("20");
  await categorySelector.selectOption("Housing");
  await dateFeild.fill('2023-05-11'); 

  await submitButton.click();
  await monthSelector.selectOption("2023 May");

  let spentValue = await totalSpent.textContent();
  await expect(spentValue).toEqual("20 kr");


  

})