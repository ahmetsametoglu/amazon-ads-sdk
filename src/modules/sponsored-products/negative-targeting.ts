import { BaseApi, BaseConfig } from '../base';
import {
  NegativeTargetingClausesApi,
  SponsoredProductsCreateSponsoredProductsNegativeTargetingClausesRequestContent,
  SponsoredProductsDeleteSponsoredProductsNegativeTargetingClausesRequestContent,
  SponsoredProductsListSponsoredProductsNegativeTargetingClausesRequestContent,
  SponsoredProductsUpdateSponsoredProductsNegativeTargetingClausesRequestContent,
} from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing negative targeting clauses in Amazon Sponsored Products campaigns.
 *
 * This module provides functionality to:
 * - Create negative targeting clauses
 * - Delete negative targeting clauses
 * - List negative targeting clauses
 * - Update negative targeting clauses
 *
 * API Version: v3
 * Content-Type: application/vnd.spnegativetargeting.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create, update and delete operations
 * - advertiser_campaign_view: For list operations
 */
export class NegativeTargetingModule extends BaseApi {
  private api: NegativeTargetingClausesApi;

  constructor(config: BaseConfig) {
    super(config);
    this.api = new NegativeTargetingClausesApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spnegativetargeting.v3+json';
      config.headers['Accept'] = 'application/vnd.spnegativetargeting.v3+json';
      return config;
    });
  }

  /**
   * Create negative targeting clauses.
   *
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async createNegativeTargetingClauses(
    profileId: string,
    request: SponsoredProductsCreateSponsoredProductsNegativeTargetingClausesRequestContent,
    prefer?: string,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.createSponsoredProductsNegativeTargetingClauses(this.clientId, profileId, request, prefer, options);
  }

  /**
   * Delete negative targeting clauses.
   *
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async deleteNegativeTargetingClauses(
    profileId: string,
    request: SponsoredProductsDeleteSponsoredProductsNegativeTargetingClausesRequestContent,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.deleteSponsoredProductsNegativeTargetingClauses(this.clientId, profileId, request, options);
  }

  /**
   * List negative targeting clauses.
   *
   * Requires permission: ["advertiser_campaign_edit", "advertiser_campaign_view"]
   */
  async listNegativeTargetingClauses(
    profileId: string,
    request?: SponsoredProductsListSponsoredProductsNegativeTargetingClausesRequestContent,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.listSponsoredProductsNegativeTargetingClauses(this.clientId, profileId, request, options);
  }

  /**
   * Update negative targeting clauses.
   *
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async updateNegativeTargetingClauses(
    profileId: string,
    request: SponsoredProductsUpdateSponsoredProductsNegativeTargetingClausesRequestContent,
    prefer?: string,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.updateSponsoredProductsNegativeTargetingClauses(this.clientId, profileId, request, prefer, options);
  }
}
