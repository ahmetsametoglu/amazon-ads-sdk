import { BaseConfig } from '../../modules/base';
import { Targeting } from './targeting';
import { Keywords } from './keywords';
import { Campaigns } from './campaigns';
import { AdGroupsModule, ProductAdsModule, ProductRecommendationsModule } from '../../modules/sponsored-products';

export namespace SP {
  export class API {
    public readonly campaigns: Campaigns.API;
    public readonly keywords: Keywords.API;
    public readonly targeting: Targeting.API;

    // Products
    private readonly productAdsModule: ProductAdsModule;
    private readonly productRecommendationsModule: ProductRecommendationsModule;

    // Ad Groups
    private readonly adGroupsModule: AdGroupsModule;

    constructor(config: BaseConfig) {
      this.campaigns = new Campaigns.API(config);
      this.keywords = new Keywords.API(config);
      this.targeting = new Targeting.API(config);

      // Products
      this.productAdsModule = new ProductAdsModule(config);
      this.productRecommendationsModule = new ProductRecommendationsModule(config);

      // Ad Groups
      this.adGroupsModule = new AdGroupsModule(config);
    }

    // Products
    public get productAds() {
      return this.productAdsModule;
    }
    public get productRecommendations() {
      return this.productRecommendationsModule;
    }

    // Ad Groups
    public get adGroups() {
      return this.adGroupsModule;
    }
  }
}
