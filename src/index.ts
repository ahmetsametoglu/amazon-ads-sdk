import { BaseConfig, BaseApi } from './modules/base';
import { CampaignsModule } from './modules/campaigns';
import { ProfilesModule } from './modules/profiles';
import { AdGroupsModule } from './modules/ad-groups';
import { ProductAdsModule } from './modules/product-ads';
import { KeywordsModule } from './modules/keywords';
import { NegativeKeywordsModule } from './modules/negative-keywords';
import { CampaignNegativeKeywordsModule } from './modules/campaign-negative-keywords';
import { KeywordRecommendationsModule } from './modules/keyword-recommendations';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export class AmazonAdsSDK extends BaseApi {
  private campaignsModule: CampaignsModule;
  private profilesModule: ProfilesModule;
  private adGroupsModule: AdGroupsModule;
  private productAdsModule: ProductAdsModule;
  private keywordsModule: KeywordsModule;
  private negativeKeywordsModule: NegativeKeywordsModule;
  private campaignNegativeKeywordsModule: CampaignNegativeKeywordsModule;
  private keywordRecommendationsModule: KeywordRecommendationsModule;

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
    this.adGroupsModule = new AdGroupsModule(this.config);
    this.productAdsModule = new ProductAdsModule(this.config);
    this.keywordsModule = new KeywordsModule(this.config);
    this.negativeKeywordsModule = new NegativeKeywordsModule(this.config);
    this.campaignNegativeKeywordsModule = new CampaignNegativeKeywordsModule(this.config);
    this.keywordRecommendationsModule = new KeywordRecommendationsModule(this.config);
  }

  public get campaigns() {
    return this.campaignsModule;
  }

  public get profiles() {
    return this.profilesModule;
  }

  public get adGroups() {
    return this.adGroupsModule;
  }

  public get productAds() {
    return this.productAdsModule;
  }

  public get keywords() {
    return this.keywordsModule;
  }

  public get negativeKeywords() {
    return this.negativeKeywordsModule;
  }

  public get campaignNegativeKeywords() {
    return this.campaignNegativeKeywordsModule;
  }

  public get keywordRecommendations() {
    return this.keywordRecommendationsModule;
  }
}

export * from './generated/sponsored-products';
export * from './modules/ad-groups';
export * from './modules/base';
export * from './modules/product-ads';
export * from './modules/keywords';
export * from './modules/negative-keywords';
export * from './modules/campaign-negative-keywords';
export * from './modules/keyword-recommendations';
