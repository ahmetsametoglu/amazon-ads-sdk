import { BaseConfig } from './modules/base';
import { SponsoredProducts } from './namespaces/sponsored-products';
import { Targeting } from './namespaces/targeting';
import { Profiles } from './namespaces/profiles';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export class AmazonAdsSDK {
  private sponsoredProductsAPI: SponsoredProducts.API;
  private targetingAPI: Targeting.API;
  private profilesAPI: Profiles.API;
  constructor(config?: Partial<BaseConfig>) {
    // Environment variables'dan config oluştur
    const defaultConfig: BaseConfig = {
      clientId: process.env.AMAZON_CLIENT_ID || '',
      clientSecret: process.env.AMAZON_CLIENT_SECRET || '',
      refreshToken: process.env.AMAZON_REFRESH_TOKEN || '',
      region: (process.env.AMAZON_REGION as 'NA' | 'EU' | 'FE') || 'EU',
      sandbox: process.env.SANDBOX_MODE === 'true',
    };

    // Kullanıcının verdiği config ile environment variables'dan gelen config'i birleştir
    const finalConfig = { ...defaultConfig, ...config };

    this.sponsoredProductsAPI = new SponsoredProducts.API(finalConfig);
    this.targetingAPI = new Targeting.API(finalConfig);
    this.profilesAPI = new Profiles.API(finalConfig);
  }

  public get sponsoredProducts() {
    return this.sponsoredProductsAPI;
  }

  public get targeting() {
    return this.targetingAPI;
  }

  public get profiles() {
    return this.profilesAPI;
  }
}

// Export namespaces
export { SponsoredProducts, Targeting, Profiles };

