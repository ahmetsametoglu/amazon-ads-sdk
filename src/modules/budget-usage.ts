import { BaseApi, BaseConfig } from './base';
import { BudgetUsageApi, BudgetUsageCampaignRequest } from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing budget usage in Amazon Sponsored Products campaigns.
 *
 * This module provides functionality to:
 * - Get budget usage for SP campaigns
 *
 * API Version: v3
 * Content-Type: application/vnd.spbudgetusage.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create and update operations
 * - advertiser_campaign_view: For list and view operations
 */
export class BudgetUsageModule extends BaseApi {
  private api: BudgetUsageApi;

  constructor(config: BaseConfig) {
    super(config);
    this.api = new BudgetUsageApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spbudgetusage.v3+json';
      config.headers['Accept'] = 'application/vnd.spbudgetusage.v3+json';
      return config;
    });
  }

  /**
   * Get budget usage information for SP campaigns.
   *
   * Requires permission: ["advertiser_campaign_edit", "advertiser_campaign_view"]
   */
  async getCampaignsBudgetUsage(profileId: string, request: BudgetUsageCampaignRequest, options?: RawAxiosRequestConfig) {
    return this.api.spCampaignsBudgetUsage(this.clientId, profileId, request, options);
  }
}
