import { BaseApi, BaseConfig } from './base';
import {
  CampaignNegativeTargetingClausesApi,
  SponsoredProductsCreateSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
  SponsoredProductsDeleteSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
  SponsoredProductsListSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
  SponsoredProductsUpdateSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
} from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing campaign negative targeting clauses in Amazon Sponsored Products campaigns.
 */
export class CampaignNegativeTargetingModule extends BaseApi {
  private api: CampaignNegativeTargetingClausesApi;

  constructor(config: BaseConfig) {
    super(config);
    this.api = new CampaignNegativeTargetingClausesApi(this.configuration, undefined, this.axiosInstance);
  }

  /**
   * Create campaign negative targeting clauses
   *
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async createCampaignNegativeTargetingClauses(
    profileId: string,
    request: SponsoredProductsCreateSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
    prefer?: string,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.createSponsoredProductsCampaignNegativeTargetingClauses(this.clientId, profileId, request, prefer, options);
  }

  /**
   * Delete campaign negative targeting clauses
   *
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async deleteCampaignNegativeTargetingClauses(
    profileId: string,
    request: SponsoredProductsDeleteSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.deleteSponsoredProductsCampaignNegativeTargetingClauses(this.clientId, profileId, request, options);
  }

  /**
   * List campaign negative targeting clauses
   *
   * Requires permission: ["advertiser_campaign_edit", "advertiser_campaign_view"]
   */
  async listCampaignNegativeTargetingClauses(
    profileId: string,
    request?: SponsoredProductsListSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.listSponsoredProductsCampaignNegativeTargetingClauses(this.clientId, profileId, request, options);
  }

  /**
   * Update campaign negative targeting clauses
   *
   * Requires permission: ["advertiser_campaign_edit"]
   */
  async updateCampaignNegativeTargetingClauses(
    profileId: string,
    request: SponsoredProductsUpdateSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
    prefer?: string,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.updateSponsoredProductsCampaignNegativeTargetingClauses(this.clientId, profileId, request, prefer, options);
  }
}
