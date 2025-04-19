import { ProductAdsApi } from '../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from './base';
import {
  SponsoredProductsCreateSponsoredProductsProductAdsRequestContent as CreateProductAdsRequestContent,
  SponsoredProductsDeleteSponsoredProductsProductAdsRequestContent as DeleteProductAdsRequestContent,
  SponsoredProductsListSponsoredProductsProductAdsRequestContent as ListProductAdsRequestContent,
  SponsoredProductsUpdateSponsoredProductsProductAdsRequestContent as UpdateProductAdsRequestContent,
} from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing Amazon Sponsored Products product advertisements.
 *
 * This module provides functionality to manage product ads in Amazon's advertising platform.
 * Product ads are created for specific ASINs (for vendors) or SKUs (for sellers) and are
 * associated with ad groups within campaigns.
 *
 * Key Features:
 * - Create, read, update and delete product ads
 * - Support for both vendor (ASIN) and seller (SKU) product identifiers
 * - Custom text ad support for KDP Authors and Book Vendors
 * - Campaign and ad group based filtering
 * - Extended data fields for detailed ad information
 *
 * API Version:
 * - Uses v3 of the Sponsored Products API
 * - Content-Type: application/vnd.spProductAd.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create, update, delete operations
 * - advertiser_campaign_view: For list operations
 *
 * @extends {BaseApi}
 */
export class ProductAdsModule extends BaseApi {
  private productAdsApi: ProductAdsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.productAdsApi = new ProductAdsApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spProductAd.v3+json';
      config.headers['Accept'] = 'application/vnd.spProductAd.v3+json';
      return config;
    });
  }

  /**
   * Lists all product ads for the specified profile.
   * Requires one of these permissions: ["advertiser_campaign_edit","advertiser_campaign_view"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - Optional filtering parameters including:
   *                 - campaignIdFilter: Filter by campaign IDs
   *                 - adGroupIdFilter: Filter by ad group IDs
   *                 - adIdFilter: Filter by ad IDs
   *                 - stateFilter: Filter by ad state
   *                 - maxResults: Number of records to include
   *                 - nextToken: Token for pagination
   * @param options - Optional axios request configuration
   * @returns Promise with the list of product ads
   */
  async list(profileId: string, content?: ListProductAdsRequestContent, options?: RawAxiosRequestConfig) {
    return this.productAdsApi.listSponsoredProductsProductAds(this.clientId, profileId, content, options);
  }

  /**
   * Creates new product ads.
   * Requires permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - The product ad creation parameters including:
   *                 - campaignId: The campaign identifier
   *                 - adGroupId: The ad group identifier
   *                 - state: Ad state (enabled, paused, archived)
   *                 - asin: The ASIN (for vendors)
   *                 - sku: The SKU (for sellers)
   *                 - customText: Custom text for KDP/Book vendors
   * @param prefer - Optional preference header for response format
   * @param options - Optional axios request configuration
   * @returns Promise with the created product ads
   */
  async create(profileId: string, content: CreateProductAdsRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.productAdsApi.createSponsoredProductsProductAds(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Updates existing product ads.
   * Requires permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - The product ad update parameters including:
   *                 - adId: The product ad identifier
   *                 - state: Updated ad state
   * @param prefer - Optional preference header for response format
   * @param options - Optional axios request configuration
   * @returns Promise with the updated product ads
   */
  async update(profileId: string, content: UpdateProductAdsRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.productAdsApi.updateSponsoredProductsProductAds(this.clientId, profileId, content, prefer, options);
  }

  /**
   * Deletes specified product ads.
   * Requires permission: ["advertiser_campaign_edit"]
   *
   * @param profileId - The profile ID associated with the advertiser account
   * @param content - The product ad deletion parameters including:
   *                 - adIdFilter: Filter specifying which ads to delete
   * @param options - Optional axios request configuration
   * @returns Promise with the deletion operation results
   */
  async delete(profileId: string, content: DeleteProductAdsRequestContent, options?: RawAxiosRequestConfig) {
    return this.productAdsApi.deleteSponsoredProductsProductAds(this.clientId, profileId, content, options);
  }
}
