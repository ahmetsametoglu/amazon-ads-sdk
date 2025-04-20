import { CampaignsModule } from '../../modules/campaigns';
import { AdGroupsModule } from '../../modules/ad-groups';
import { ProductAdsModule } from '../../modules/product-ads';
import { KeywordsModule } from '../../modules/keywords';
import { NegativeKeywordsModule } from '../../modules/negative-keywords';
import { CampaignNegativeKeywordsModule } from '../../modules/campaign-negative-keywords';
import { KeywordRecommendationsModule } from '../../modules/keyword-recommendations';
import { CampaignOptimizationRulesModule } from '../../modules/campaign-optimization-rules';
import { BaseConfig } from '../../modules/base';

export namespace SponsoredProducts {
  export interface Config extends BaseConfig {}

  export class API {
    private campaignsModule: CampaignsModule;
    private adGroupsModule: AdGroupsModule;
    private productAdsModule: ProductAdsModule;
    private keywordsModule: KeywordsModule;
    private negativeKeywordsModule: NegativeKeywordsModule;
    private campaignNegativeKeywordsModule: CampaignNegativeKeywordsModule;
    private keywordRecommendationsModule: KeywordRecommendationsModule;
    private campaignOptimizationRulesModule: CampaignOptimizationRulesModule;

    constructor(config: Config) {
      this.campaignsModule = new CampaignsModule(config);
      this.adGroupsModule = new AdGroupsModule(config);
      this.productAdsModule = new ProductAdsModule(config);
      this.keywordsModule = new KeywordsModule(config);
      this.negativeKeywordsModule = new NegativeKeywordsModule(config);
      this.campaignNegativeKeywordsModule = new CampaignNegativeKeywordsModule(config);
      this.keywordRecommendationsModule = new KeywordRecommendationsModule(config);
      this.campaignOptimizationRulesModule = new CampaignOptimizationRulesModule(config);
    }

    public get campaigns() {
      return this.campaignsModule;
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
  }
}

// Re-export modules outside of namespace
export * from '../../modules/campaigns';
export * from '../../modules/ad-groups';
export * from '../../modules/product-ads';
export * from '../../modules/keywords';
export * from '../../modules/negative-keywords';
export * from '../../modules/campaign-negative-keywords';
export * from '../../modules/keyword-recommendations';
export * from '../../modules/campaign-optimization-rules';
