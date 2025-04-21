import { TargetingModule } from '../../modules/sponsored-products/targeting';
import { NegativeTargetingModule } from '../../modules/sponsored-products/negative-targeting';
import { CampaignNegativeTargetingModule } from '../../modules/sponsored-products/campaign-negative-targeting';
import { ProductTargetingModule } from '../../modules/sponsored-products/product-targeting';
import { TargetPromotionGroupsModule } from '../../modules/sponsored-products/target-promotion-groups';
import { BaseConfig } from '../../modules/base';

export namespace Targeting {
  export interface Config extends BaseConfig {}

  export class API {
    private targetingModule: TargetingModule;
    private negativeTargetingModule: NegativeTargetingModule;
    private campaignNegativeTargetingModule: CampaignNegativeTargetingModule;
    private productTargetingModule: ProductTargetingModule;
    private targetPromotionGroupsModule: TargetPromotionGroupsModule;

    constructor(config: Config) {
      this.targetingModule = new TargetingModule(config);
      this.negativeTargetingModule = new NegativeTargetingModule(config);
      this.campaignNegativeTargetingModule = new CampaignNegativeTargetingModule(config);
      this.productTargetingModule = new ProductTargetingModule(config);
      this.targetPromotionGroupsModule = new TargetPromotionGroupsModule(config);
    }

    public get targeting() {
      return this.targetingModule;
    }

    public get negativeTargeting() {
      return this.negativeTargetingModule;
    }

    public get campaignNegativeTargeting() {
      return this.campaignNegativeTargetingModule;
    }

    public get productTargeting() {
      return this.productTargetingModule;
    }

    public get targetPromotionGroups() {
      return this.targetPromotionGroupsModule;
    }
  }
} 