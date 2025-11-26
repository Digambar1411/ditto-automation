import { Page, Locator } from '@playwright/test';

export class DittoInsurancePage {
  // Page reference
  readonly page: Page;
  
  // locators 
  readonly nextButton: Locator;
  readonly continueButton: Locator;
  readonly calculatePremiumButton: Locator;
  readonly basePremiumText: Locator;
  readonly totalPremiumText: Locator;
  
  // Constructor
  constructor(page: Page) {
    this.page = page;
    

    this.nextButton = page.locator(`//button/descendant::span[contains(text(),'Next')]`);
    this.continueButton = page.locator(`//button/descendant::span[text()='Continue']`);
    this.calculatePremiumButton = page.getByRole('button', { name: 'Calculate Premium' });
    this.basePremiumText = page.locator(`//span[text()='Base Premium']/following-sibling::span`);
    this.totalPremiumText = page.locator(`//span[text()='Total Premium']/following-sibling::span`);
  }
  
  // Method 1: Navigate to the website
  async navigateToHomePage() {
    await this.page.goto('https://app.joinditto.in/fq');
    await this.page.screenshot({ path: 'screenshots/01-homepage.png' });
  }
  
  // Method 2: Select health product
  async selectHealthProduct(productName: string) {
    await this.page.locator(`//span[text()='${productName}']`).click();
    await this.page.screenshot({ path: 'screenshots/02-product-selected.png' });
  }
  
  // Method 3: Navigate through initial form steps
  async navigateInitialSteps() {
    await this.nextButton.click(); // Step 1
    await this.nextButton.click(); // Step 2
    await this.nextButton.click(); // Step 3
    await this.continueButton.click();
  }
  
  // Method 4: Select self and gender
  async selectSelfMale() {
    await this.page.locator('text=Self').locator('..').locator('text=Male').first().click();
    await this.page.locator(`//button/descendant::span[contains(text(),'Next step')]`).click();
  }
  
  // Method 5: Fill personal details
  async fillPersonalDetails(age: string, pincode: string) {
    await this.page.fill('input[name="Selfage"]', age);
    await this.page.fill('input[name="pincode"]', pincode);
    await this.page.screenshot({ path: 'screenshots/03-form-filled.png' });
  }
  
  // Method 6: Calculate premium and wait for result
  async calculatePremium() {
    await this.calculatePremiumButton.click();
    // Wait for calculation to complete
    await this.page.locator(`//span[text()='Base Premium']`).waitFor({ state: 'visible', timeout: 60000 });
    await this.page.screenshot({ path: 'screenshots/04-premium-calculated.png' });
  }
  
  // Method 7: Get base premium value
  async getBasePremium(): Promise<number> {
    const text = await this.basePremiumText.textContent();
    return parseFloat(text!.replace(/[^\d.]/g, ''));
  }
  
  // Method 8: Select recommended addon
  async selectRecommendedAddon(addonName: string) {
    await this.page.locator(`//input[@name='${addonName}']`).first().check();
    await this.page.waitForLoadState('networkidle');
  }
  
  // Method 9: Expand other addons section
  async expandOtherAddons() {
    await this.page.locator(`(//span[contains(text(),'Other Add-ons')])[1]`).click();
  }
  
  // Method 10: Select multiple riders
  async selectRiders(riderNames: string[]) {
    for (let rider of riderNames) {
      await this.page.locator(`//input[@name='${rider}']`).first().check();
      await this.page.waitForTimeout(1500); // Wait for animation
    }
    await this.page.screenshot({ path: 'screenshots/05-riders-selected.png' });
  }
  
  // Method 11: Get addon premiums from sidebar
  async getAddonPremiums(): Promise<number> {
    let addonPremiums: number[] = [];
    
    // Get recommended addon premium
    const recommendedText = await this.page
      .locator('//button[contains(., "Recommended Add-ons")]/descendant::*[contains(text(), "₹")]')
      .last()
      .textContent();
    if (recommendedText) {
      addonPremiums.push(parseFloat(recommendedText.replace(/[^\d.]/g, '')));
    }
    
    // Get other addons premium
    const otherText = await this.page
      .locator('//button[contains(., "Other Add-ons")]/descendant::*[contains(text(), "₹")]')
      .last()
      .textContent();
    if (otherText) {
      addonPremiums.push(parseFloat(otherText.replace(/[^\d.]/g, '')));
    }
    
    // Return total with 2 decimal precision
    const total = addonPremiums.reduce((acc, cur) => acc + cur, 0);
    return Math.round(total * 100) / 100;
  }
  
  // Method 12: Get total premium displayed
  async getTotalPremium(): Promise<number> {
    const text = await this.totalPremiumText.textContent();
    return parseFloat(text!.replace(/[^\d.]/g, ''));
  }
  
  // Method 13: Take final screenshot
  async takeFinalScreenshot() {
    await this.page.screenshot({ path: 'screenshots/06-final-result.png', fullPage: true });
  }
}