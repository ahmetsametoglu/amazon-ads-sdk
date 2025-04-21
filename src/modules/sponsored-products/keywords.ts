import { KeywordsApi } from '../../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from '../base';
import {
  SponsoredProductsCreateSponsoredProductsKeywordsRequestContent as CreateKeywordRequestContent,
  SponsoredProductsDeleteSponsoredProductsKeywordsRequestContent as DeleteKeywordRequestContent,
  SponsoredProductsListSponsoredProductsKeywordsRequestContent as ListKeywordsRequestContent,
  SponsoredProductsUpdateSponsoredProductsKeywordsRequestContent as UpdateKeywordRequestContent,
} from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing Amazon Sponsored Products keywords.
 *
 * This module provides functionality to manage keywords within ad groups. Keywords determine
 * when ads appear in search results and manage bidding strategies for those placements.
 *
 * Key Features:
 * - Create and manage keywords
 * - Support for broad, phrase, and exact match types
 * - Bid optimization and management
 * - Ad group-based filtering
 * - Access to performance metrics
 * - Bulk operation support
 *
 * API Version:
 * - Uses Sponsored Products API v3
 * - Content-Type: application/vnd.spKeyword.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create, update, delete operations
 * - advertiser_campaign_view: For list operations
 *
 * @extends {BaseApi}
 */
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

  /**
   * Lists keywords for the specified profile.
   * Required permissions: ["advertiser_campaign_edit","advertiser_campaign_view"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Optional filtering parameters:
   *                 - adGroupIdFilter: Filter by ad group IDs
   *                 - campaignIdFilter: Filter by campaign IDs
   *                 - keywordIdFilter: Filter by keyword IDs
   *                 - matchTypeFilter: Filter by match type
   *                 - stateFilter: Filter by state
   * @param options - Optional axios request configuration
   * @returns Promise with the list of keywords
   */
  async list(profileId: string, content?: ListKeywordsRequestContent, options?: RawAxiosRequestConfig) {
    return this.keywordsApi.listSponsoredProductsKeywords(this.clientId, profileId, content, options);
  }

  /**
   * Creates new keywords.
   * Required permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Keyword creation parameters:
   *                 - adGroupId: Ad group identifier
   *                 - keywordText: Keyword text
   *                 - matchType: Match type (BROAD, PHRASE, EXACT)
   *                 - bid: Bid amount
   *                 - state: Keyword state
   * @param prefer - Optional preference header
   * @param options - Optional axios request configuration
   * @returns Promise with the created keywords
   */
  async create(profileId: string, content: CreateKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.keywordsApi.createSponsoredProductsKeywords(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Updates existing keywords.
   * Required permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Update parameters:
   *                 - keywordId: Keyword identifier
   *                 - state: Updated state
   *                 - bid: Updated bid
   * @param prefer - Optional preference header
   * @param options - Optional axios request configuration
   * @returns Promise with the updated keywords
   */
  async update(profileId: string, content: UpdateKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.keywordsApi.updateSponsoredProductsKeywords(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Deletes specified keywords.
   * Required permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Deletion parameters:
   *                 - keywordIdFilter: Keyword IDs to delete
   * @param options - Optional axios request configuration
   * @returns Promise with the deletion operation results
   */
  async delete(profileId: string, content: DeleteKeywordRequestContent, options?: RawAxiosRequestConfig) {
    return this.keywordsApi.deleteSponsoredProductsKeywords(this.clientId, profileId, content, options);
  }
}
