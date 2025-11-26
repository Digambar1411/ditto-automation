export type PremiumCase = {
  id: string;
  product: string;
  persona: string;
  age: number;
  pincode: string;
  recommendedAddon: string;
  otherAddons: string[];
};

export const premiumCases: PremiumCase[] = [
  {
    id: 'optima-secure-young',
    persona: 'Young urban buyer',
    product: 'Optima Secure',
    age: 25,
    pincode: '591254',
    recommendedAddon: 'Unlimited Restoration',
    otherAddons: ['Hospital Cash Benefit', 'Limitless'],
  },
  {
    id: 'optima-secure-senior',
    persona: 'Senior citizen',
    product: 'Optima Secure',
    age: 58,
    pincode: '560001',
    recommendedAddon: 'Unlimited Restoration',
    otherAddons: ['Hospital Cash Benefit'],
  },
];

