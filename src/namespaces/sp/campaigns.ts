import { BaseConfig } from '../../modules/base';
import { CampaignsModule, CampaignOptimizationRulesModule, BudgetUsageModule } from '../../modules/sponsored-products';
import {
  SponsoredProductsCreateSponsoredProductsCampaignsRequestContent,
  SponsoredProductsUpdateSponsoredProductsCampaignsRequestContent,
  SponsoredProductsDeleteSponsoredProductsCampaignsRequestContent,
  SponsoredProductsListSponsoredProductsCampaignsRequestContent,
  CreateSPCampaignOptimizationRulesRequest,
  UpdateSPCampaignOptimizationRulesRequest,
  SPCampaignOptimizationNotificationAPIRequest,
  SPCampaignOptimizationRecommendationsAPIRequest,
  BudgetUsageCampaignRequest,
} from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Amazon Sponsored Products Campaign Management
 *
 * This namespace provides campaign management functionality for Amazon Sponsored Products ads.
 * It consists of three main components:
 * 1. API: Basic campaign CRUD operations
 * 2. Optimization: Campaign optimization rules management
 * 3. Budget: Campaign budget usage tracking
 *
 * @namespace Campaigns
 */
export namespace Campaigns {
  /**
   * Campaign Optimization Management
   *
   * This class provides rule management for automatic campaign optimization.
   * Optimization rules can include:
   * - Automatic bid optimization
   * - Budget management
   * - Rule creation based on performance targets
   * - Rule state and eligibility monitoring
   *
   * @class Optimization
   */
  export class Optimization {
    private readonly module: CampaignOptimizationRulesModule;

    constructor(config: BaseConfig) {
      this.module = new CampaignOptimizationRulesModule(config);
    }

    /**
     * Creates a new optimization rule
     *
     * @param profileId - The profile ID of the advertiser account
     * @param request - Optimization rule creation parameters:
     *                 - ruleType: Type of rule (e.g., 'BUDGET', 'BIDDING')
     *                 - expression: Rule conditions
     *                 - action: Actions to trigger
     * @param options - Optional Axios configuration
     * @returns Details of the created optimization rule
     * @requires permission: advertiser_campaign_edit
     */
    async createRule(profileId: string, request: CreateSPCampaignOptimizationRulesRequest, options?: RawAxiosRequestConfig) {
      return this.module.createRule(profileId, request, options);
    }

    /**
     * Updates an existing optimization rule
     *
     * @param profileId - The profile ID of the advertiser account
     * @param request - Update parameters:
     *                 - ruleId: ID of the rule to update
     *                 - expression: New rule conditions
     *                 - action: New actions
     *                 - state: Rule state (ENABLED/DISABLED)
     * @param options - Optional Axios configuration
     * @returns Details of the updated rule
     * @requires permission: advertiser_campaign_edit
     */
    async updateRule(profileId: string, request: UpdateSPCampaignOptimizationRulesRequest, options?: RawAxiosRequestConfig) {
      return this.module.updateRule(profileId, request, options);
    }

    /**
     * Checks the current state of an optimization rule
     *
     * @param profileId - The profile ID of the advertiser account
     * @param request - State query parameters:
     *                 - ruleId: ID of the rule to check
     *                 - timeframe: Time period to check
     * @param options - Optional Axios configuration
     * @returns Rule execution status and performance metrics
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async getRuleState(profileId: string, request: SPCampaignOptimizationNotificationAPIRequest, options?: RawAxiosRequestConfig) {
      return this.module.getRuleState(profileId, request, options);
    }

    /**
     * Checks campaign eligibility for optimization rules
     *
     * @param profileId - The profile ID of the advertiser account
     * @param request - Eligibility check parameters:
     *                 - campaignIds: Campaign IDs to check
     *                 - ruleType: Type of rule to check
     * @param options - Optional Axios configuration
     * @returns Campaign eligibility status and recommendations
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async getRuleEligibility(profileId: string, request: SPCampaignOptimizationRecommendationsAPIRequest, options?: RawAxiosRequestConfig) {
      return this.module.getRuleEligibility(profileId, request, options);
    }

    /**
     * Retrieves details of a specific optimization rule
     *
     * @param profileId - The profile ID of the advertiser account
     * @param ruleId - ID of the rule to retrieve
     * @param options - Optional Axios configuration
     * @returns Rule configuration and current status
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async getRule(profileId: string, ruleId: string, options?: RawAxiosRequestConfig) {
      return this.module.getRule(profileId, ruleId, options);
    }

    /**
     * Deletes an optimization rule
     *
     * @param profileId - The profile ID of the advertiser account
     * @param ruleId - ID of the rule to delete
     * @param options - Optional Axios configuration
     * @returns Result of the deletion operation
     * @requires permission: advertiser_campaign_edit
     */
    async deleteRule(profileId: string, ruleId: string, options?: RawAxiosRequestConfig) {
      return this.module.deleteRule(profileId, ruleId, options);
    }
  }

  /**
   * Campaign Budget Management
   *
   * This class provides functionality to track campaign budget usage.
   * Features:
   * - Daily/total budget usage tracking
   * - Campaign-level spending analysis
   * - Budget usage trends
   *
   * @class Budget
   */
  export class Budget {
    private readonly module: BudgetUsageModule;

    constructor(config: BaseConfig) {
      this.module = new BudgetUsageModule(config);
    }

    /**
     * Retrieves budget usage information for campaigns
     *
     * @param profileId - The profile ID of the advertiser account
     * @param request - Budget usage query parameters:
     *                 - campaignIds: Campaign IDs to monitor
     *                 - timeframe: Reporting time period
     *                 - metrics: Requested metrics
     * @param options - Optional Axios configuration
     * @returns Campaign budget usage details
     * @requires permission: advertiser_campaign_view
     */
    async getUsage(profileId: string, request: BudgetUsageCampaignRequest, options?: RawAxiosRequestConfig) {
      return this.module.getCampaignsBudgetUsage(profileId, request, options);
    }
  }

  /**
   * Core Campaign Management API
   *
   * This class provides basic CRUD operations for Sponsored Products campaigns.
   * Features:
   * - Campaign creation and editing
   * - Budget and bidding strategy management
   * - Campaign state control
   * - Bulk campaign management
   *
   * @class API
   */
  export class API {
    private readonly module: CampaignsModule;
    public readonly optimization: Optimization;
    public readonly budget: Budget;

    constructor(config: BaseConfig) {
      this.module = new CampaignsModule(config);
      this.optimization = new Optimization(config);
      this.budget = new Budget(config);
    }

    /**
     * Creates a new Sponsored Products campaign
     *
     * @param profileId - The profile ID of the advertiser account
     * @param request - Campaign creation parameters:
     *                 - name: Campaign name
     *                 - targetingType: Targeting type (MANUAL/AUTO)
     *                 - state: Campaign state (ENABLED/PAUSED)
     *                 - dynamicBidding: Bidding strategy settings
     *                 - budget: Budget settings
     *                 - startDate/endDate: Campaign dates
     * @param prefer - Response format preference
     * @param options - Optional Axios configuration
     * @returns Created campaign details
     * @requires permission: advertiser_campaign_edit
     */
    async create(
      profileId: string,
      request: SponsoredProductsCreateSponsoredProductsCampaignsRequestContent,
      prefer?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.create(profileId, request, prefer, options);
    }

    /**
     * Updates existing campaigns
     *
     * @param profileId - The profile ID of the advertiser account
     * @param request - Update parameters:
     *                 - campaignId: ID of the campaign to update
     *                 - name: New campaign name
     *                 - state: New campaign state
     *                 - budget: New budget settings
     * @param prefer - Response format preference
     * @param options - Optional Axios configuration
     * @returns Updated campaign details
     * @requires permission: advertiser_campaign_edit
     */
    async update(
      profileId: string,
      request: SponsoredProductsUpdateSponsoredProductsCampaignsRequestContent,
      prefer?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.update(profileId, request, prefer, options);
    }

    /**
     * Deletes campaigns
     *
     * @param profileId - The profile ID of the advertiser account
     * @param request - Deletion parameters:
     *                 - campaignIdFilter: Campaign IDs to delete
     * @param options - Optional Axios configuration
     * @returns Result of the deletion operation
     * @requires permission: advertiser_campaign_edit
     */
    async delete(profileId: string, request: SponsoredProductsDeleteSponsoredProductsCampaignsRequestContent, options?: RawAxiosRequestConfig) {
      return this.module.delete(profileId, request, options);
    }

    /**
     * Retrieves a list of campaigns
     *
     * @param profileId - The profile ID of the advertiser account
     * @param request - Listing parameters:
     *                 - stateFilter: State filter
     *                 - campaignIdFilter: Campaign ID filter
     *                 - nameFilter: Name filter
     *                 - portfolioIdFilter: Portfolio ID filter
     * @param options - Optional Axios configuration
     * @returns List of campaigns and their details
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async list(profileId: string, request?: SponsoredProductsListSponsoredProductsCampaignsRequestContent, options?: RawAxiosRequestConfig) {
      return this.module.list(profileId, request, options);
    }
  }
}
