import { CampaignNegativeKeywordsApi } from '../../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from '../base';
import {
  SponsoredProductsCreateSponsoredProductsCampaignNegativeKeywordsRequestContent as CreateCampaignNegativeKeywordRequestContent,
  SponsoredProductsDeleteSponsoredProductsCampaignNegativeKeywordsRequestContent as DeleteCampaignNegativeKeywordRequestContent,
  SponsoredProductsListSponsoredProductsCampaignNegativeKeywordsRequestContent as ListCampaignNegativeKeywordsRequestContent,
  SponsoredProductsUpdateSponsoredProductsCampaignNegativeKeywordsRequestContent as UpdateCampaignNegativeKeywordRequestContent,
} from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing campaign-level negative keywords.
 *
 * This module provides functionality to manage negative keywords at the campaign level,
 * allowing advertisers to prevent their ads from showing on unwanted search terms.
 * Campaign-level negative keywords apply to all ad groups within the campaign.
 *
 * Key Features:
 * - Create and manage campaign-level negative keywords
 * - Support for broad and exact match types
 * - Campaign-level filtering and management
 * - Bulk operation support (CRUD for multiple keywords)
 * - State management (enabled, paused, archived)
 *
 * API Version:
 * - Uses Sponsored Products API v3
 * - Content-Type: application/vnd.spCampaignNegativeKeyword.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create, update, delete operations
 * - advertiser_campaign_view: For list operations
 *
 * @extends {BaseApi}
 */
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

  /**
   * Lists campaign negative keywords for the specified profile.
   * Required permissions: ["advertiser_campaign_edit","advertiser_campaign_view"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Optional filtering parameters:
   *                 - campaignIdFilter: Filter by campaign IDs
   *                 - keywordIdFilter: Filter by keyword IDs
   *                 - matchTypeFilter: Filter by match type (BROAD, EXACT)
   *                 - maxResults: Number of records per page
   *                 - nextToken: Token for pagination
   * @param options - Optional axios request configuration
   * @returns Promise with the list of campaign negative keywords
   */
  async list(profileId: string, content?: ListCampaignNegativeKeywordsRequestContent, options?: RawAxiosRequestConfig) {
    return this.campaignNegativeKeywordsApi.listSponsoredProductsCampaignNegativeKeywords(this.clientId, profileId, content, options);
  }

  /**
   * Creates new campaign negative keywords.
   * Required permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Keyword creation parameters:
   *                 - campaignId: Campaign identifier
   *                 - keywordText: Keyword text
   *                 - matchType: Match type (BROAD, EXACT)
   *                 - state: Keyword state
   * @param prefer - Optional preference header
   * @param options - Optional axios request configuration
   * @returns Promise with the created campaign negative keywords
   */
  async create(profileId: string, content: CreateCampaignNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.campaignNegativeKeywordsApi.createSponsoredProductsCampaignNegativeKeywords(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Updates existing campaign negative keywords.
   * Required permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Update parameters:
   *                 - keywordId: Keyword identifier
   *                 - state: Updated state
   * @param prefer - Optional preference header
   * @param options - Optional axios request configuration
   * @returns Promise with the updated campaign negative keywords
   */
  async update(profileId: string, content: UpdateCampaignNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.campaignNegativeKeywordsApi.updateSponsoredProductsCampaignNegativeKeywords(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Deletes specified campaign negative keywords.
   * Required permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Deletion parameters:
   *                 - keywordIdFilter: Keyword IDs to delete
   * @param options - Optional axios request configuration
   * @returns Promise with the deletion operation results
   */
  async delete(profileId: string, content: DeleteCampaignNegativeKeywordRequestContent, options?: RawAxiosRequestConfig) {
    return this.campaignNegativeKeywordsApi.deleteSponsoredProductsCampaignNegativeKeywords(this.clientId, profileId, content, options);
  }
}
