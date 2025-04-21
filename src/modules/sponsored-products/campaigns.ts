import { CampaignsApi } from '../../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from '../base';
import {
  SponsoredProductsCreateSponsoredProductsCampaignsRequestContent as CreateCampaignRequestContent,
  SponsoredProductsDeleteSponsoredProductsCampaignsRequestContent as DeleteCampaignRequestContent,
  SponsoredProductsListSponsoredProductsCampaignsRequestContent as ListCampaignsRequestContent,
  SponsoredProductsUpdateSponsoredProductsCampaignsRequestContent as UpdateCampaignRequestContent,
} from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing Amazon Sponsored Products advertising campaigns.
 *
 * This module provides functionality to manage advertising campaigns in Amazon's
 * Sponsored Products platform. Campaigns are the top-level containers for organizing
 * advertising activities.
 *
 * Key Features:
 * - Create, read, update and delete campaigns
 * - Campaign budget management and scheduling
 * - Dynamic bidding configuration
 * - Targeting type specification
 * - Campaign state management
 * - Custom tagging support (up to 50 identifiers)
 *
 * API Version:
 * - Uses v3 of the Sponsored Products API
 * - Content-Type: application/vnd.spCampaign.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create, update, delete operations
 * - advertiser_campaign_view: For list operations
 *
 * @extends {BaseApi}
 */
export class CampaignsModule extends BaseApi {
  private campaignsApi: CampaignsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.campaignsApi = new CampaignsApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spCampaign.v3+json';
      config.headers['Accept'] = 'application/vnd.spCampaign.v3+json';
      return config;
    });
  }

  /**
   * Lists all campaigns for the specified profile.
   * Requires one of these permissions: ["advertiser_campaign_edit","advertiser_campaign_view"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Optional filtering parameters including:
   *                 - campaignIdFilter: Filter by campaign IDs
   *                 - stateFilter: Filter by campaign state
   *                 - name: Filter by campaign name
   *                 - portfolioIdFilter: Filter by portfolio IDs
   *                 - maxResults: Number of records to include
   *                 - nextToken: Token for pagination
   * @param options - Optional axios request configuration
   * @returns Promise with the list of campaigns
   */
  async list(profileId: string, content?: ListCampaignsRequestContent, options?: RawAxiosRequestConfig) {
    return this.campaignsApi.listSponsoredProductsCampaigns(this.clientId, profileId, content, options);
  }

  /**
   * Creates new advertising campaigns.
   * Requires permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - The campaign creation parameters including:
   *                 - name: Campaign name
   *                 - targetingType: Campaign targeting type
   *                 - state: Campaign state
   *                 - dynamicBidding: Bidding strategy configuration
   *                 - startDate/endDate: Campaign schedule (YYYY-MM-DD)
   *                 - budget: Campaign budget settings
   *                 - tags: Custom identifiers (max 50)
   * @param prefer - Optional preference header for response format
   * @param options - Optional axios request configuration
   * @returns Promise with the created campaigns
   */
  async create(profileId: string, content: CreateCampaignRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.campaignsApi.createSponsoredProductsCampaigns(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Updates existing advertising campaigns.
   * Requires permission: ["advertiser_campaign_edit"]
   * Note: targetingType cannot be updated
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - The campaign update parameters including:
   *                 - campaignId: The campaign identifier
   *                 - name: Updated campaign name
   *                 - state: Updated campaign state
   *                 - budget: Updated budget settings
   *                 - startDate/endDate: Updated schedule
   *                 - tags: Updated custom identifiers
   * @param prefer - Optional preference header for response format
   * @param options - Optional axios request configuration
   * @returns Promise with the updated campaigns
   */
  async update(profileId: string, content: UpdateCampaignRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.campaignsApi.updateSponsoredProductsCampaigns(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Deletes specified advertising campaigns.
   * Requires permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - The campaign deletion parameters including:
   *                 - campaignIdFilter: Filter specifying which campaigns to delete
   * @param options - Optional axios request configuration
   * @returns Promise with the deletion operation results
   */
  async delete(profileId: string, content: DeleteCampaignRequestContent, options?: RawAxiosRequestConfig) {
    return this.campaignsApi.deleteSponsoredProductsCampaigns(this.clientId, profileId, content, options);
  }
}
