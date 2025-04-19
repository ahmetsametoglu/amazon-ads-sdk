import { CampaignNegativeKeywordsApi } from '../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from './base';
import {
  SponsoredProductsCreateSponsoredProductsCampaignNegativeKeywordsRequestContent as CreateCampaignNegativeKeywordRequestContent,
  SponsoredProductsDeleteSponsoredProductsCampaignNegativeKeywordsRequestContent as DeleteCampaignNegativeKeywordRequestContent,
  SponsoredProductsListSponsoredProductsCampaignNegativeKeywordsRequestContent as ListCampaignNegativeKeywordsRequestContent,
  SponsoredProductsUpdateSponsoredProductsCampaignNegativeKeywordsRequestContent as UpdateCampaignNegativeKeywordRequestContent,
} from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

export class CampaignNegativeKeywordsModule extends BaseApi {
  private campaignNegativeKeywordsApi: CampaignNegativeKeywordsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.campaignNegativeKeywordsApi = new CampaignNegativeKeywordsApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spCampaignNegativeKeyword.v3+json';
      config.headers['Accept'] = 'application/vnd.spCampaignNegativeKeyword.v3+json';
      return config;
    });
  }

  async list(profileId: string, content?: ListCampaignNegativeKeywordsRequestContent, options?: RawAxiosRequestConfig) {
    return this.campaignNegativeKeywordsApi.listSponsoredProductsCampaignNegativeKeywords(this.clientId, profileId, content, options);
  }

  async create(profileId: string, content: CreateCampaignNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.campaignNegativeKeywordsApi.createSponsoredProductsCampaignNegativeKeywords(this.clientId, profileId, content, prefer, options);
  }

  async update(profileId: string, content: UpdateCampaignNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.campaignNegativeKeywordsApi.updateSponsoredProductsCampaignNegativeKeywords(this.clientId, profileId, content, prefer, options);
  }

  async delete(profileId: string, content: DeleteCampaignNegativeKeywordRequestContent, options?: RawAxiosRequestConfig) {
    return this.campaignNegativeKeywordsApi.deleteSponsoredProductsCampaignNegativeKeywords(this.clientId, profileId, content, options);
  }
}
