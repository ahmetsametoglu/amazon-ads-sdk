import { BaseConfig, BaseApi } from "./modules/base";
import { CampaignsModule } from "./modules/campaigns";

export class AmazonAdsSDK extends BaseApi {
  private campaignsModule: CampaignsModule;

  constructor(config: BaseConfig) {
    super(config);
    this.campaignsModule = new CampaignsModule(config);
  }

  public get campaigns() {
    return this.campaignsModule;
  }
}

export * from "./generated/sponsored-products";
