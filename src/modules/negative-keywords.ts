import { NegativeKeywordsApi } from '../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from './base';
import {
  SponsoredProductsCreateSponsoredProductsNegativeKeywordsRequestContent as CreateNegativeKeywordRequestContent,
  SponsoredProductsDeleteSponsoredProductsNegativeKeywordsRequestContent as DeleteNegativeKeywordRequestContent,
  SponsoredProductsListSponsoredProductsNegativeKeywordsRequestContent as ListNegativeKeywordsRequestContent,
  SponsoredProductsUpdateSponsoredProductsNegativeKeywordsRequestContent as UpdateNegativeKeywordRequestContent,
} from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

export class NegativeKeywordsModule extends BaseApi {
  private negativeKeywordsApi: NegativeKeywordsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.negativeKeywordsApi = new NegativeKeywordsApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spNegativeKeyword.v3+json';
      config.headers['Accept'] = 'application/vnd.spNegativeKeyword.v3+json';
      return config;
    });
  }

  async list(profileId: string, content?: ListNegativeKeywordsRequestContent, options?: RawAxiosRequestConfig) {
    return this.negativeKeywordsApi.listSponsoredProductsNegativeKeywords(this.clientId, profileId, content, options);
  }

  async create(profileId: string, content: CreateNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.negativeKeywordsApi.createSponsoredProductsNegativeKeywords(this.clientId, profileId, content, prefer, options);
  }

  async update(profileId: string, content: UpdateNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.negativeKeywordsApi.updateSponsoredProductsNegativeKeywords(this.clientId, profileId, content, prefer, options);
  }

  async delete(profileId: string, content: DeleteNegativeKeywordRequestContent, options?: RawAxiosRequestConfig) {
    return this.negativeKeywordsApi.deleteSponsoredProductsNegativeKeywords(this.clientId, profileId, content, options);
  }
}
