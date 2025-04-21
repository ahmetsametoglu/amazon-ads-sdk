import { BaseApi, BaseConfig } from '../base';
import {
  CampaignOptimizationRulesApi,
  CreateSPCampaignOptimizationRulesRequest,
  UpdateSPCampaignOptimizationRulesRequest,
  SPCampaignOptimizationRecommendationsAPIRequest,
  SPCampaignOptimizationNotificationAPIRequest,
} from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing Campaign Optimization Rules.
 *
 * This module enables you to create, update, and manage optimization rules for your
 * Amazon Sponsored Products campaigns. Campaign Optimization Rules allow you to automate
 * campaign management based on performance metrics and business goals.
 *
 * Features:
 * - Automated bid optimization
 * - Campaign budget management
 * - Rule creation based on performance targets
 * - Rule state and eligibility monitoring
 * - Support for multiple optimization strategies
 *
 * API Version: v3
 * Content-Type: application/vnd.optimizationrules.v1+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For rule creation, update, and deletion operations
 * - advertiser_campaign_view: For rule listing and viewing operations
 */
export class CampaignOptimizationRulesModule extends BaseApi {
  private api: CampaignOptimizationRulesApi;

  constructor(config: BaseConfig) {
    super(config);
    this.api = new CampaignOptimizationRulesApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.optimizationrules.v1+json';
      config.headers['Accept'] = 'application/vnd.optimizationrules.v1+json';
      return config;
    });
  }

  /**
   * Creates a new campaign optimization rule.
   * Use this method to set up automated campaign management based on your specified criteria.
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async createRule(profileId: string, content: CreateSPCampaignOptimizationRulesRequest, options?: RawAxiosRequestConfig) {
    return this.api.createOptimizationRule(this.clientId, content, profileId, options);
  }

  /**
   * Updates an existing campaign optimization rule.
   * Modify rule parameters, conditions, or actions to adjust your optimization strategy.
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async updateRule(profileId: string, content: UpdateSPCampaignOptimizationRulesRequest, options?: RawAxiosRequestConfig) {
    return this.api.updateOptimizationRule(this.clientId, content, profileId, options);
  }

  /**
   * Checks the state of a specified campaign optimization rule.
   * Monitors rule execution status and performance metrics.
   * Recommended to check no more than once per day.
   * Requires one of these permissions: ["advertiser_campaign_edit","advertiser_campaign_view"]
   */
  async getRuleState(profileId: string, content: SPCampaignOptimizationNotificationAPIRequest, options?: RawAxiosRequestConfig) {
    return this.api.getRuleNotification(this.clientId, content, profileId, options);
  }

  /**
   * Evaluates campaign eligibility for optimization rules.
   * Determines which campaigns can be optimized based on specified criteria and current performance.
   * Requires one of these permissions: ["advertiser_campaign_edit","advertiser_campaign_view"]
   */
  async getRuleEligibility(profileId: string, content: SPCampaignOptimizationRecommendationsAPIRequest, options?: RawAxiosRequestConfig) {
    return this.api.getOptimizationRuleEligibility(this.clientId, content, profileId, options);
  }

  /**
   * Retrieves a specific campaign optimization rule by its ID.
   * Returns detailed information about rule configuration and current status.
   * Requires one of these permissions: ["advertiser_campaign_edit","advertiser_campaign_view"]
   */
  async getRule(profileId: string, ruleId: string, options?: RawAxiosRequestConfig) {
    return this.api.getCampaignOptimizationRule(this.clientId, ruleId, profileId, options);
  }

  /**
   * Deletes a campaign optimization rule by its ID.
   * Permanently removes the rule and stops its automated optimizations.
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async deleteRule(profileId: string, ruleId: string, options?: RawAxiosRequestConfig) {
    return this.api.deleteCampaignOptimizationRule(this.clientId, ruleId, profileId, options);
  }
}
