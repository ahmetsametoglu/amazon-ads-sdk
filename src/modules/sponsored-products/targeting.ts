import { BaseApi, BaseConfig } from '../base';
import {
  TargetingClausesApi,
  SponsoredProductsCreateSponsoredProductsTargetingClausesRequestContent,
  SponsoredProductsDeleteSponsoredProductsTargetingClausesRequestContent,
  SponsoredProductsListSponsoredProductsTargetingClausesRequestContent,
  SponsoredProductsUpdateSponsoredProductsTargetingClausesRequestContent,
} from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing targeting clauses in Amazon Sponsored Products campaigns.
 *
 * This module provides functionality to:
 * - Create targeting clauses
 * - Delete targeting clauses
 * - List targeting clauses
 * - Update targeting clauses
 *
 * API Version: v3
 * Content-Type: application/vnd.sptargeting.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For all operations
 */
export class TargetingModule extends BaseApi {
  private api: TargetingClausesApi;

  constructor(config: BaseConfig) {
    super(config);
    this.api = new TargetingClausesApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.sptargeting.v3+json';
      config.headers['Accept'] = 'application/vnd.sptargeting.v3+json';
      return config;
    });
  }

  /**
   * Create targeting clauses.
   *
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async createTargetingClauses(
    profileId: string,
    request: SponsoredProductsCreateSponsoredProductsTargetingClausesRequestContent,
    prefer?: string,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.createSponsoredProductsTargetingClauses(this.clientId, profileId, request, prefer, options);
  }

  /**
   * Delete targeting clauses.
   *
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async deleteTargetingClauses(
    profileId: string,
    request: SponsoredProductsDeleteSponsoredProductsTargetingClausesRequestContent,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.deleteSponsoredProductsTargetingClauses(this.clientId, profileId, request, options);
  }

  /**
   * List targeting clauses.
   *
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async listTargetingClauses(
    profileId: string,
    request?: SponsoredProductsListSponsoredProductsTargetingClausesRequestContent,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.listSponsoredProductsTargetingClauses(this.clientId, profileId, request, options);
  }

  /**
   * Update targeting clauses.
   *
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async updateTargetingClauses(
    profileId: string,
    request: SponsoredProductsUpdateSponsoredProductsTargetingClausesRequestContent,
    prefer?: string,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.updateSponsoredProductsTargetingClauses(this.clientId, profileId, request, prefer, options);
  }
}
