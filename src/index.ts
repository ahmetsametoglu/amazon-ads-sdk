import { BaseConfig, BaseApi } from './modules/base';
import { CampaignsModule } from './modules/campaigns';
import { ProfilesModule } from './modules/profiles';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export class AmazonAdsSDK extends BaseApi {
  private campaignsModule: CampaignsModule;
  private profilesModule: ProfilesModule;
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
    super({ ...defaultConfig, ...config });

    this.campaignsModule = new CampaignsModule(this.config);
    this.profilesModule = new ProfilesModule(this.config);
  }

  public get campaigns() {
    return this.campaignsModule;
  }

  public get profiles() {
    return this.profilesModule;
  }
}

export * from './generated/sponsored-products';
