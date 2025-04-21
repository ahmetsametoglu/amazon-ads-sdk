import { NegativeKeywordsApi } from '../../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from '../base';
import {
  SponsoredProductsCreateSponsoredProductsNegativeKeywordsRequestContent as CreateNegativeKeywordRequestContent,
  SponsoredProductsDeleteSponsoredProductsNegativeKeywordsRequestContent as DeleteNegativeKeywordRequestContent,
  SponsoredProductsListSponsoredProductsNegativeKeywordsRequestContent as ListNegativeKeywordsRequestContent,
  SponsoredProductsUpdateSponsoredProductsNegativeKeywordsRequestContent as UpdateNegativeKeywordRequestContent,
} from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing negative keywords at the ad group level.
 *
 * This module provides functionality to manage negative keywords within ad groups,
 * allowing advertisers to prevent their ads from showing on specific search terms
 * at the ad group level.
 *
 * Key Features:
 * - Create and manage ad group-level negative keywords
 * - Support for broad and exact match types
 * - Ad group-based filtering and management
 * - Bulk operation support (CRUD for multiple keywords)
 * - State management (enabled, paused, archived)
 *
 * API Version:
 * - Uses Sponsored Products API v3
 * - Content-Type: application/vnd.spNegativeKeyword.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create, update, delete operations
 * - advertiser_campaign_view: For list operations
 *
 * @extends {BaseApi}
 */
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

  /**
   * Lists negative keywords for the specified profile.
   * Required permissions: ["advertiser_campaign_edit","advertiser_campaign_view"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Optional filtering parameters:
   *                 - adGroupIdFilter: Filter by ad group IDs
   *                 - keywordIdFilter: Filter by keyword IDs
   *                 - matchTypeFilter: Filter by match type (BROAD, EXACT)
   *                 - maxResults: Number of records per page
   *                 - nextToken: Token for pagination
   * @param options - Optional axios request configuration
   * @returns Promise with the list of negative keywords
   */
  async list(profileId: string, content?: ListNegativeKeywordsRequestContent, options?: RawAxiosRequestConfig) {
    return this.negativeKeywordsApi.listSponsoredProductsNegativeKeywords(this.clientId, profileId, content, options);
  }

  /**
   * Creates new negative keywords.
   * Required permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Keyword creation parameters:
   *                 - adGroupId: Ad group identifier
   *                 - keywordText: Keyword text
   *                 - matchType: Match type (BROAD, EXACT)
   *                 - state: Keyword state
   * @param prefer - Optional preference header
   * @param options - Optional axios request configuration
   * @returns Promise with the created negative keywords
   */
  async create(profileId: string, content: CreateNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.negativeKeywordsApi.createSponsoredProductsNegativeKeywords(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Updates existing negative keywords.
   * Required permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Update parameters:
   *                 - keywordId: Keyword identifier
   *                 - state: Updated state
   * @param prefer - Optional preference header
   * @param options - Optional axios request configuration
   * @returns Promise with the updated negative keywords
   */
  async update(profileId: string, content: UpdateNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.negativeKeywordsApi.updateSponsoredProductsNegativeKeywords(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Deletes specified negative keywords.
   * Required permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Deletion parameters:
   *                 - keywordIdFilter: Keyword IDs to delete
   * @param options - Optional axios request configuration
   * @returns Promise with the deletion operation results
   */
  async delete(profileId: string, content: DeleteNegativeKeywordRequestContent, options?: RawAxiosRequestConfig) {
    return this.negativeKeywordsApi.deleteSponsoredProductsNegativeKeywords(this.clientId, profileId, content, options);
  }
}
