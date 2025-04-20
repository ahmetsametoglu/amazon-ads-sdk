import { BaseConfig, BaseApi } from './modules/base';
import { CampaignsModule } from './modules/campaigns';
import { ProfilesModule } from './modules/profiles';
import { AdGroupsModule } from './modules/ad-groups';
import { ProductAdsModule } from './modules/product-ads';
import { KeywordsModule } from './modules/keywords';
import { NegativeKeywordsModule } from './modules/negative-keywords';
import { CampaignNegativeKeywordsModule } from './modules/campaign-negative-keywords';
import { KeywordRecommendationsModule } from './modules/keyword-recommendations';
import { CampaignOptimizationRulesModule } from './modules/campaign-optimization-rules';
import { TargetPromotionGroupsModule } from './modules/target-promotion-groups';
import { ProductTargetingModule } from './modules/product-targeting';
import { ProductRecommendationsModule } from './modules/product-recommendations';
import { BudgetUsageModule } from './modules/budget-usage';
import { KeywordGroupRecommendationsModule } from './modules/keyword-group-recommendations';
import { NegativeTargetingModule } from './modules/negative-targeting';
import { TargetingModule } from './modules/targeting';
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
  private campaignOptimizationRulesModule: CampaignOptimizationRulesModule;
  private targetPromotionGroupsModule: TargetPromotionGroupsModule;
  private productTargetingModule: ProductTargetingModule;
  private productRecommendationsModule: ProductRecommendationsModule;
  private budgetUsageModule: BudgetUsageModule;
  private keywordGroupRecommendationsModule: KeywordGroupRecommendationsModule;
  private negativeTargetingModule: NegativeTargetingModule;
  private targetingModule: TargetingModule;

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
    this.campaignOptimizationRulesModule = new CampaignOptimizationRulesModule(this.config);
    this.targetPromotionGroupsModule = new TargetPromotionGroupsModule(this.config);
    this.productTargetingModule = new ProductTargetingModule(this.config);
    this.productRecommendationsModule = new ProductRecommendationsModule(this.config);
    this.budgetUsageModule = new BudgetUsageModule(this.config);
    this.keywordGroupRecommendationsModule = new KeywordGroupRecommendationsModule(this.config);
    this.negativeTargetingModule = new NegativeTargetingModule(this.config);
    this.targetingModule = new TargetingModule(this.config);
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

  public get campaignOptimizationRules() {
    return this.campaignOptimizationRulesModule;
  }

  public get targetPromotionGroups() {
    return this.targetPromotionGroupsModule;
  }

  public get productTargeting() {
    return this.productTargetingModule;
  }

  public get productRecommendations() {
    return this.productRecommendationsModule;
  }

  public get budgetUsage() {
    return this.budgetUsageModule;
  }

  public get keywordGroupRecommendations() {
    return this.keywordGroupRecommendationsModule;
  }

  public get negativeTargeting() {
    return this.negativeTargetingModule;
  }

  public get targeting() {
    return this.targetingModule;
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
export * from './modules/campaign-optimization-rules';
export * from './modules/target-promotion-groups';
export * from './modules/product-targeting';
export * from './modules/budget-usage';
export * from './modules/keyword-group-recommendations';
export * from './modules/negative-targeting';
export * from './modules/targeting';
