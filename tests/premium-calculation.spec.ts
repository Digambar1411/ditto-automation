import { test, expect } from '@playwright/test';
import { DittoInsurancePage } from './pages/DittoInsurancePage';

test('Verify premium calculation includes base premium and riders', async ({ page }) => {
  // Create page object
  const dittoPage = new DittoInsurancePage(page);
  
  // Step 1: Navigate to homepage
  await dittoPage.navigateToHomePage();
  
  // Step 2: Select health product
  await dittoPage.selectHealthProduct('Optima Secure');
  
  // Step 3: Navigate through initial steps
  await dittoPage.navigateInitialSteps();
  
  // Step 4: Select Self - Male
  await dittoPage.selectSelfMale();
  
  // Step 5: Fill personal details
  await dittoPage.fillPersonalDetails('25', '591254');
  
  // Step 6: Calculate premium
  await dittoPage.calculatePremium();
  
  // Step 7: Get base premium
  const basePremium = await dittoPage.getBasePremium();
  
  // Step 8: Select recommended addon
  await dittoPage.selectRecommendedAddon('Unlimited Restoration');
  
  // Step 9: Expand and select other riders
  await dittoPage.expandOtherAddons();
  await dittoPage.selectRiders(['Hospital Cash Benefit', 'Limitless']);
  
  // Step 10: Get addon premiums total
  const addonTotal = await dittoPage.getAddonPremiums();
  
  // Step 11: Calculate expected premium
  const calculatedPremium = Math.round((basePremium + addonTotal) * 100) / 100;
  
  // Step 12: Get actual displayed premium
  const displayedPremium = await dittoPage.getTotalPremium();
  
  // Step 13: Take final screenshot
  await dittoPage.takeFinalScreenshot();
  
  // Step 14: Log results
  console.log(`✓ Premium Breakdown:`);
  console.log(`  Base Premium: ₹${basePremium.toFixed(2)}`);
  console.log(`  Addons Total: ₹${addonTotal.toFixed(2)}`);
  console.log(`  Calculated Total: ₹${calculatedPremium.toFixed(2)}`);
  console.log(`  Final Premium (Displayed): ₹${displayedPremium.toFixed(2)}`);
  
  // Step 15: Verify calculation
  expect(displayedPremium).toBe(calculatedPremium);
  console.log(`✓ Premium Verification Passed!`);
});
