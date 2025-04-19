import { KeywordTargetsApi } from '../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from './base';
import { GetGlobalRankedKeywordRecommendationRequest, GetRankedKeywordRecommendationRequest } from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing Amazon Sponsored Products keyword recommendations.
 *
 * This module provides functionality to:
 * - Get keyword recommendations for multiple marketplaces globally
 * - Get keyword recommendations for a single marketplace
 *
 * Key Features:
 * - Theme-based bid recommendations with impact metrics
 * - Keyword ranking by clicks/conversions/impressions
 * - Search term performance metrics
 * - Custom keyword target ranking
 * - Multi-locale support
 * - Multiple bidding strategies
 *
 * Version Support:
 * - Version 5.0: Available in US, CA, UK, DE, FR, ES, IN, JP
 *   Features: Theme-based bids, impact metrics, multiple bidding strategies
 * - Version 4.0: Available in all marketplaces
 *   Features: Click/conversion ranking, search term metrics
 *
 * @extends {BaseApi}
 */
export class KeywordRecommendationsModule extends BaseApi {
  private keywordTargetsApi: KeywordTargetsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.keywordTargetsApi = new KeywordTargetsApi(this.configuration, undefined, this.axiosInstance);
  }

  /**
   * Gets keyword recommendations for multiple marketplaces.
   *
   * The endpoint returns recommended keyword targets for a list of countries given either:
   * A) a list of ad ASINs per target country or
   * B) a global campaign ID and ad group ID
   *
   * Use the recommendationType field to specify option A or B. This endpoint will also return
   * recommended bids along with each recommendation keyword target.
   *
   * Global API endpoint accepts:
   * - asins array: Item is a country asin map where key is 2-letter country code and value is an asin
   * - targets array: Item is a country target object with matchType and countryKeywords fields
   *
   * Each country will be processed in parallel according to version 5 recommendation API rules.
   * Available in all marketplaces.
   *
   * @param profileId - The profile ID
   * @param accountId - The account ID
   * @param request - The request parameters for global keyword recommendations
   * @param marketplaceId - Optional marketplace ID
   * @param advertiserId - Optional advertiser ID
   * @param options - Optional axios request configuration
   * @returns Promise with the response containing global keyword recommendations
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
   * Gets keyword recommendations for a single marketplace.
   *
   * The endpoint returns recommended keyword targets given either:
   * A) a list of ad ASINs or
   * B) a campaign ID and ad group ID
   *
   * Features:
   * - Ranking: Keywords are ranked by clicks/impressions based on sortDimension
   * - Custom targets: Add your own keywords to be ranked using the targets array
   * - Localization: Get keywords in specific locale using the locale field
   *
   * Version 5.0 Features (US, CA, UK, DE, FR, ES, IN, JP only):
   * - Theme-based bid recommendations with impact metrics
   * - Themes: CONVERSION_OPPORTUNITIES (default), SPECIAL_DAYS (for events)
   * - Bidding strategies:
   *   - LEGACY_FOR_SALES: Dynamic bids (down only)
   *   - AUTO_FOR_SALES: Dynamic bids (up and down)
   *   - MANUAL: Fixed bids
   *
   * Version 4.0 Features (all marketplaces):
   * - Ranking by clicks/conversions
   * - Search term metrics:
   *   - Impression share: % of your ad impressions for keyword
   *   - Impression rank: Your position among advertisers
   *
   * @param profileId - The profile ID
   * @param request - The request parameters for keyword recommendations
   * @param marketplaceId - Optional marketplace ID
   * @param advertiserId - Optional advertiser ID
   * @param options - Optional axios request configuration
   * @returns Promise with the response containing keyword recommendations
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
