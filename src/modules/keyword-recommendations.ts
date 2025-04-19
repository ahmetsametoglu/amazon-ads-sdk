import { KeywordTargetsApi } from '../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from './base';
import { GetGlobalRankedKeywordRecommendationRequest, GetRankedKeywordRecommendationRequest } from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

export class KeywordRecommendationsModule extends BaseApi {
  private keywordTargetsApi: KeywordTargetsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.keywordTargetsApi = new KeywordTargetsApi(this.configuration, undefined, this.axiosInstance);
  }

  /**
   * Çoklu ülke için anahtar kelime önerileri alır
   */
  async getGlobalRecommendations(
    profileId: string,
    accountId: string,
    request: GetGlobalRankedKeywordRecommendationRequest,
    marketplaceId?: string,
    advertiserId?: string,
    options?: RawAxiosRequestConfig
  ) {
    return this.keywordTargetsApi.getGlobalRankedKeywordRecommendation(
      this.clientId,
      profileId,
      accountId,
      marketplaceId,
      advertiserId,
      request,
      options
    );
  }

  /**
   * Tekil pazar yeri için anahtar kelime önerileri alır
   */
  async getRecommendations(
    profileId: string,
    request: GetRankedKeywordRecommendationRequest,
    marketplaceId?: string,
    advertiserId?: string,
    options?: RawAxiosRequestConfig
  ) {
    return this.keywordTargetsApi.getRankedKeywordRecommendation(this.clientId, profileId, marketplaceId, advertiserId, request, options);
  }
}
