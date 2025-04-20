import { BaseApi, BaseConfig } from './base';
import { ProductRecommendationServiceApi, GetProductRecommendationsRequest } from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing product recommendations in Amazon Sponsored Products campaigns.
 *
 * This module provides functionality to:
 * - Get product recommendations for ASINs
 *
 * API Version: v3
 * Content-Type: application/vnd.spproductrecommendation.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create and update operations
 * - advertiser_campaign_view: For list and view operations
 */
export class ProductRecommendationsModule extends BaseApi {
  private api: ProductRecommendationServiceApi;

  constructor(config: BaseConfig) {
    super(config);
    this.api = new ProductRecommendationServiceApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spproductrecommendation.v3+json';
      config.headers['Accept'] = 'application/vnd.spproductrecommendation.v3+json';
      return config;
    });
  }

  /**
   * Given an advertised ASIN as input, this API returns suggested ASINs to target in a product targeting campaign.
   * We use various methods to generate these suggestions, including:
   * - Historical performance of your ad
   * - Items that shoppers frequently view and purchase together
   *
   * Available themes:
   * - Top converting targets
   * - Similar items (frequently viewed together)
   * - Complements
   * - Similar items with low ratings and reviews
   * - Other books read by your readers
   *
   * Requires permission: ["advertiser_campaign_edit", "advertiser_campaign_view"]
   */
  async getProductRecommendations(profileId: string, request?: GetProductRecommendationsRequest, options?: RawAxiosRequestConfig) {
    return this.api.getProductRecommendations(this.clientId, profileId, undefined, request, options);
  }
}
