import { BaseConfig } from './modules/base';
import { SP } from './namespaces/sp';
import { Profiles } from './namespaces/profiles';
import { AuthModule } from './modules/auth';
import { Reports } from './namespaces/reports';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export class AmazonAdsSDK {
  private sponsoredProductsAPI: SP.API;
  private profilesAPI: Profiles.API;
  private authModule: AuthModule;
  private reportsAPI: Reports.API;

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

    this.sponsoredProductsAPI = new SP.API(finalConfig);
    this.profilesAPI = new Profiles.API(finalConfig);
    this.authModule = new AuthModule({
      clientId: finalConfig.clientId,
      clientSecret: finalConfig.clientSecret,
      region: finalConfig.region,
    });
    this.reportsAPI = new Reports.API(finalConfig);
  }

  public get sp() {
    return this.sponsoredProductsAPI;
  }

  public get profiles() {
    return this.profilesAPI;
  }

  public get auth() {
    return this.authModule;
  }

  public get reports() {
    return this.reportsAPI;
  }
}

// Export namespaces and types
export { SP, Reports };
export type { BaseConfig } from './modules/base';
