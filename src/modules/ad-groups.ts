import { AdGroupsApi } from '../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from './base';
import {
  SponsoredProductsCreateSponsoredProductsAdGroupsRequestContent as CreateAdGroupRequestContent,
  SponsoredProductsDeleteSponsoredProductsAdGroupsRequestContent as DeleteAdGroupRequestContent,
  SponsoredProductsListSponsoredProductsAdGroupsRequestContent as ListAdGroupsRequestContent,
  SponsoredProductsUpdateSponsoredProductsAdGroupsRequestContent as UpdateAdGroupRequestContent,
} from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing Amazon Sponsored Products ad groups.
 *
 * This module provides functionality to manage ad groups within campaigns. Ad groups are containers
 * for ads and targeting options, allowing advertisers to organize their advertising by product groups
 * or themes.
 *
 * Key Features:
 * - Create, read, update and delete ad groups
 * - Default bid management for keywords
 * - Campaign association and filtering
 * - State management (enabled, paused, archived)
 * - Extended data support for detailed ad group information
 * - Name-based and targeting type filtering
 *
 * API Version:
 * - Uses v3 of the Sponsored Products API
 * - Content-Type: application/vnd.spAdGroup.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create, update, delete operations
 * - advertiser_campaign_view: For list operations
 *
 * @extends {BaseApi}
 */
export class AdGroupsModule extends BaseApi {
  private adGroupsApi: AdGroupsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.adGroupsApi = new AdGroupsApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spAdGroup.v3+json';
      config.headers['Accept'] = 'application/vnd.spAdGroup.v3+json';
      return config;
    });
  }

  /**
   * Lists all ad groups for the specified profile.
   * Requires one of these permissions: ["advertiser_campaign_edit","advertiser_campaign_view"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Optional filtering parameters including:
   *                 - campaignIdFilter: Filter by campaign IDs
   *                 - adGroupIdFilter: Filter by ad group IDs
   *                 - stateFilter: Filter by ad group state
   *                 - nameFilter: Filter by ad group name
   *                 - campaignTargetingTypeFilter: Filter by campaign targeting type
   *                 - maxResults: Number of records to include
   *                 - nextToken: Token for pagination
   *                 - includeExtendedDataFields: Include additional data fields
   * @param options - Optional axios request configuration
   * @returns Promise with the list of ad groups
   */
  async list(profileId: string, content?: ListAdGroupsRequestContent, options?: RawAxiosRequestConfig) {
    return this.adGroupsApi.listSponsoredProductsAdGroups(this.clientId, profileId, content, options);
  }

  /**
   * Creates new ad groups.
   * Requires permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - The ad group creation parameters including:
   *                 - campaignId: The campaign identifier
   *                 - name: The ad group name
   *                 - state: Ad group state (enabled, paused, archived)
   *                 - defaultBid: Default bid for keywords in the ad group
   * @param prefer - Optional preference header for response format
   * @param options - Optional axios request configuration
   * @returns Promise with the created ad groups
   */
  async create(profileId: string, content: CreateAdGroupRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.adGroupsApi.createSponsoredProductsAdGroups(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Updates existing ad groups.
   * Requires permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - The ad group update parameters including:
   *                 - adGroupId: The ad group identifier
   *                 - name: Updated ad group name
   *                 - state: Updated ad group state
   *                 - defaultBid: Updated default bid
   * @param prefer - Optional preference header for response format
   * @param options - Optional axios request configuration
   * @returns Promise with the updated ad groups
   */
  async update(profileId: string, content: UpdateAdGroupRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.adGroupsApi.updateSponsoredProductsAdGroups(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Deletes specified ad groups.
   * Requires permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - The ad group deletion parameters including:
   *                 - adGroupIdFilter: Filter specifying which ad groups to delete
   * @param options - Optional axios request configuration
   * @returns Promise with the deletion operation results
   */
  async delete(profileId: string, content: DeleteAdGroupRequestContent, options?: RawAxiosRequestConfig) {
    return this.adGroupsApi.deleteSponsoredProductsAdGroups(this.clientId, profileId, content, options);
  }
}
