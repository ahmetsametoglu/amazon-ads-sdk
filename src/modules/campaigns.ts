import { CampaignsApi } from '../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from './base';
import {
  SponsoredProductsCreateSponsoredProductsCampaignsRequestContent as CreateCampaignRequestContent,
  SponsoredProductsDeleteSponsoredProductsCampaignsRequestContent as DeleteCampaignRequestContent,
  SponsoredProductsListSponsoredProductsCampaignsRequestContent as ListCampaignsRequestContent,
  SponsoredProductsUpdateSponsoredProductsCampaignsRequestContent as UpdateCampaignRequestContent,
} from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

export class CampaignsModule extends BaseApi {
  private campaignsApi: CampaignsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.campaignsApi = new CampaignsApi(this.configuration, undefined, this.axiosInstance);

    // Content-Type ve Accept header'larını ayarla
    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spCampaign.v3+json';
      config.headers['Accept'] = 'application/vnd.spCampaign.v3+json';
      return config;
    });
  }

  async list(profileId: string, content?: ListCampaignsRequestContent, options?: RawAxiosRequestConfig) {
    return this.campaignsApi.listSponsoredProductsCampaigns(this.clientId, profileId, content, options);
  }

  async create(profileId: string, content: CreateCampaignRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.campaignsApi.createSponsoredProductsCampaigns(this.clientId, profileId, content, prefer, options);
  }

  async update(profileId: string, content: UpdateCampaignRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.campaignsApi.updateSponsoredProductsCampaigns(this.clientId, profileId, content, prefer, options);
  }

  async delete(profileId: string, content: DeleteCampaignRequestContent, options?: RawAxiosRequestConfig) {
    return this.campaignsApi.deleteSponsoredProductsCampaigns(this.clientId, profileId, content, options);
  }
}
