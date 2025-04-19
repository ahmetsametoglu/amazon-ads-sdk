import { AmazonAdsSDK } from "../src";
import { BaseConfig } from "../src/modules/base";
import {
  SponsoredProductsListSponsoredProductsCampaignsRequestContent as ListCampaignsRequestContent,
  SponsoredProductsEntityState,
} from "../src/generated/sponsored-products/api";

// SDK yapılandırması

const config: BaseConfig = {
  clientId: process.env.AMAZON_CLIENT_ID || "",
  clientSecret: process.env.AMAZON_CLIENT_SECRET || "",
  refreshToken: process.env.AMAZON_REFRESH_TOKEN || "",
  region: (process.env.AMAZON_REGION || "EU") as BaseConfig["region"],
};

const sdk = new AmazonAdsSDK(config);

async function listEUCampaigns() {
  try {
    const requestContent: ListCampaignsRequestContent = {
      stateFilter: { include: [SponsoredProductsEntityState.Enabled] },
      maxResults: 50,
    };

    const campaigns = await sdk.campaigns.list(
      "YOUR_PROFILE_ID", // Amazon Advertising API Profile ID'nizi buraya ekleyin
      requestContent
    );
    console.log("Kampanyalar:", campaigns.data);
  } catch (error) {
    console.error("Kampanya listeleme hatası:", error);
  }
}

export { listEUCampaigns };
