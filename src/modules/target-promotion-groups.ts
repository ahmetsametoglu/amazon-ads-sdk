import { BaseApi, BaseConfig } from './base';
import {
  TargetPromotionGroupsApi,
  SponsoredProductsListTargetPromotionGroupsV2RequestContent as ListTargetPromotionGroupsRequestContent,
  SponsoredProductsCreateTargetPromotionGroupsV2RequestContent as CreateTargetPromotionGroupsRequestContent,
  SponsoredProductsGetTargetPromotionGroupsRecommendationsRequestContent as GetTargetPromotionGroupsRecommendationsRequestContent,
  SponsoredProductsListTargetPromotionGroupTargetsRequestContent as ListTargetPromotionGroupTargetsRequestContent,
  SponsoredProductsCreateTargetPromotionGroupTargetsRequestContent as CreateTargetPromotionGroupTargetsRequestContent,
} from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing Target Promotion Groups in Amazon Sponsored Products campaigns.
 *
 * Target Promotion Groups allow advertisers to create and manage groups of products
 * for targeting in their advertising campaigns. This module provides functionality
 * to create and list target promotion groups, as well as get recommendations for new groups.
 *
 * Features:
 * - Create new target promotion groups and targets
 * - List all target promotion groups and their targets
 * - Get recommendations for new groups
 *
 * API Version: v2
 * Content-Type: application/vnd.sptargetpromotiongroup.v2+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create operations
 * - advertiser_campaign_view: For list and view operations
 */
export class TargetPromotionGroupsModule extends BaseApi {
  private api: TargetPromotionGroupsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.api = new TargetPromotionGroupsApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.sptargetpromotiongroup.v2+json';
      config.headers['Accept'] = 'application/vnd.sptargetpromotiongroup.v2+json';
      return config;
    });
  }

  /**
   * Lists all target promotion groups for the specified profile.
   * Use this method to retrieve information about existing target promotion groups.
   * Requires permission: ["advertiser_campaign_view"]
   */
  async list(profileId: string, content?: ListTargetPromotionGroupsRequestContent, options?: RawAxiosRequestConfig) {
    return this.api.listTargetPromotionGroups(this.clientId, profileId, content, options);
  }

  /**
   * Lists all targets created through target promotion groups.
   * Use this method to retrieve information about targets associated with promotion groups.
   * Requires permission: ["advertiser_campaign_view"]
   */
  async listTargets(profileId: string, content?: ListTargetPromotionGroupTargetsRequestContent, options?: RawAxiosRequestConfig) {
    return this.api.listTargetPromotionGroupTargets(this.clientId, profileId, content, options);
  }

  /**
   * Creates new target promotion groups.
   * Use this method to create new groups of products for targeting in campaigns.
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async create(profileId: string, content: CreateTargetPromotionGroupsRequestContent, options?: RawAxiosRequestConfig) {
    return this.api.createTargetPromotionGroups(this.clientId, profileId, content, options);
  }

  /**
   * Creates new targets in the target promotion groups.
   * Use this method to add keyword and/or product targets to manual ad groups.
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async createTargets(profileId: string, content: CreateTargetPromotionGroupTargetsRequestContent, options?: RawAxiosRequestConfig) {
    return this.api.createTargetPromotionGroupTargets(this.clientId, profileId, content, options);
  }

  /**
   * Gets recommendations for target promotion groups.
   * Use this method to receive suggestions for new target promotion groups based on your campaign data.
   * Requires permission: ["advertiser_campaign_view"]
   */
  async getRecommendations(profileId: string, content?: GetTargetPromotionGroupsRecommendationsRequestContent, options?: RawAxiosRequestConfig) {
    return this.api.getTargetPromotionGroupsRecommendations(this.clientId, profileId, content, options);
  }
}
