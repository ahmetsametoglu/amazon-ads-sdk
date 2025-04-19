import { CampaignsApi } from "../generated/sponsored-products/api";
import { BaseApi, BaseConfig } from "./base";
import {
  SponsoredProductsCreateSponsoredProductsCampaignsRequestContent,
  SponsoredProductsDeleteSponsoredProductsCampaignsRequestContent,
  SponsoredProductsListSponsoredProductsCampaignsRequestContent,
  SponsoredProductsUpdateSponsoredProductsCampaignsRequestContent,
} from "../generated/sponsored-products";
import { RawAxiosRequestConfig } from "axios";

export class CampaignsModule extends BaseApi {
  private campaignsApi: CampaignsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.campaignsApi = new CampaignsApi(
      this.configuration,
      undefined,
      this.axiosInstance
    );
  }

  async list(
    profileId: string,
    content?: SponsoredProductsListSponsoredProductsCampaignsRequestContent,
    options?: RawAxiosRequestConfig
  ) {
    return this.campaignsApi.listSponsoredProductsCampaigns(
      this.clientId,
      profileId,
      content,
      options
    );
  }

  async create(
    profileId: string,
    content: SponsoredProductsCreateSponsoredProductsCampaignsRequestContent,
    prefer?: string,
    options?: RawAxiosRequestConfig
  ) {
    return this.campaignsApi.createSponsoredProductsCampaigns(
      this.clientId,
      profileId,
      content,
      prefer,
      options
    );
  }

  async update(
    profileId: string,
    content: SponsoredProductsUpdateSponsoredProductsCampaignsRequestContent,
    prefer?: string,
    options?: RawAxiosRequestConfig
  ) {
    return this.campaignsApi.updateSponsoredProductsCampaigns(
      this.clientId,
      profileId,
      content,
      prefer,
      options
    );
  }

  async delete(
    profileId: string,
    content: SponsoredProductsDeleteSponsoredProductsCampaignsRequestContent,
    options?: RawAxiosRequestConfig
  ) {
    return this.campaignsApi.deleteSponsoredProductsCampaigns(
      this.clientId,
      profileId,
      content,
      options
    );
  }
}

