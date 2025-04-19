import { KeywordsApi } from '../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from './base';
import {
  SponsoredProductsCreateSponsoredProductsKeywordsRequestContent as CreateKeywordRequestContent,
  SponsoredProductsDeleteSponsoredProductsKeywordsRequestContent as DeleteKeywordRequestContent,
  SponsoredProductsListSponsoredProductsKeywordsRequestContent as ListKeywordsRequestContent,
  SponsoredProductsUpdateSponsoredProductsKeywordsRequestContent as UpdateKeywordRequestContent,
} from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

export class KeywordsModule extends BaseApi {
  private keywordsApi: KeywordsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.keywordsApi = new KeywordsApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spKeyword.v3+json';
      config.headers['Accept'] = 'application/vnd.spKeyword.v3+json';
      return config;
    });
  }

  async list(profileId: string, content?: ListKeywordsRequestContent, options?: RawAxiosRequestConfig) {
    return this.keywordsApi.listSponsoredProductsKeywords(this.clientId, profileId, content, options);
  }

  async create(profileId: string, content: CreateKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.keywordsApi.createSponsoredProductsKeywords(this.clientId, profileId, content, prefer, options);
  }

  async update(profileId: string, content: UpdateKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.keywordsApi.updateSponsoredProductsKeywords(this.clientId, profileId, content, prefer, options);
  }

  async delete(profileId: string, content: DeleteKeywordRequestContent, options?: RawAxiosRequestConfig) {
    return this.keywordsApi.deleteSponsoredProductsKeywords(this.clientId, profileId, content, options);
  }
}
