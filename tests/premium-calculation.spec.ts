import { test, expect } from '@playwright/test';
import { DittoInsurancePage } from './pages/DittoInsurancePage';
import { premiumCases } from './data/premium-cases';

for (const scenario of premiumCases) {
  test(`Premium calculation - ${scenario.persona} (${scenario.id})`, async ({ page }) => {
    const dittoPage = new DittoInsurancePage(page);

    await dittoPage.navigateToHomePage();
    await dittoPage.selectHealthProduct(scenario.product);
    await dittoPage.navigateInitialSteps();
    await dittoPage.selectSelfMale();
    await dittoPage.fillPersonalDetails(String(scenario.age), scenario.pincode);
    await dittoPage.calculatePremium();

    const basePremium = await dittoPage.getBasePremium();

    await dittoPage.selectRecommendedAddon(scenario.recommendedAddon);
    await dittoPage.expandOtherAddons();
    await dittoPage.selectRiders(scenario.otherAddons);

    const addonTotal = await dittoPage.getAddonPremiums();
    const calculatedPremium = Math.round((basePremium + addonTotal) * 100) / 100;
    const displayedPremium = await dittoPage.getTotalPremium();

    console.log(`✓ Scenario: ${scenario.id}`);
    console.log(`  Base Premium: ₹${basePremium.toFixed(2)}`);
    console.log(`  Addons Total: ₹${addonTotal.toFixed(2)}`);
    console.log(`  Calculated Total: ₹${calculatedPremium.toFixed(2)}`);
    console.log(`  Final Premium (Displayed): ₹${displayedPremium.toFixed(2)}`);

    expect(displayedPremium).toBe(calculatedPremium);
  });
}
