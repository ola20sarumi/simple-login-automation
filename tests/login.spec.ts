import { test, expect } from '@playwright/test';
import { LoginPage } from  '../LoginPage'; // Adjust the path as necessary
test.describe('Authentication Flow', () => {
  let loginPage: LoginPage;

  // Initialize the page object before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Assert that the URL changed to the inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // Assert a UI element is visible after login
    const inventoryList = page.locator('.inventory_list');
    await expect(inventoryList).toBeVisible();
  });

  test('should show error message with invalid credentials', async () => {
    await loginPage.login('locked_out_user', 'wrong_password');
    
    // Assert the error message contains the expected text
    await expect(loginPage.errorMessage).toContainText('Epic sadface');
  });
});