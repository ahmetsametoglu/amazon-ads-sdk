import { BaseApi, BaseConfig } from '../base';
import { KeywordGroupTargetingRecommendationsApi, KeywordGroupsRecommendationsRequest } from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing keyword group targeting recommendations in Amazon Sponsored Products campaigns.
 *
 * This module provides functionality to:
 * - Get keyword group recommendations for ASINs
 *
 * API Version: v3 (Beta)
 * Content-Type: application/vnd.spkeywordgrouprecommendations.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create and update operations
 * - advertiser_campaign_view: For list and view operations
 */
export class KeywordGroupRecommendationsModule extends BaseApi {
  private api: KeywordGroupTargetingRecommendationsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.api = new KeywordGroupTargetingRecommendationsApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spkeywordgrouprecommendations.v3+json';
      config.headers['Accept'] = 'application/vnd.spkeywordgrouprecommendations.v3+json';
      return config;
    });
  }

  /**
   * Get keyword group recommendations for a given list of Ad ASINs.
   *
   * Keyword Groups is a new control for Amazon Ads Sponsored Products keyword-based campaigns
   * that enables advertisers to reach relevant audiences through a collection of keywords.
   *
   * Benefits:
   * - Improves campaign performance by dynamically updating keywords
   * - Eliminates need for constant keyword curation
   * - Can be used alongside regular keywords in same ad group
   *
   * Note: This API is currently in beta.
   *
   * Requires permission: ["advertiser_campaign_edit", "advertiser_campaign_view"]
   */
  async getKeywordGroupRecommendations(
    profileId: string,
    request?: KeywordGroupsRecommendationsRequest,
    locale?: string,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.getKeywordGroupRecommendations(this.clientId, profileId, locale, request, options);
  }
}
