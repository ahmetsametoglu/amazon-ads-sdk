import { BaseApi, BaseConfig } from '../base';
import {
  ProductTargetingApi,
  GetCategoryRecommendationsForAsinsRequest,
  GetTargetableAsinCountsRequest,
  SearchBrandsRequest,
  GetCategoryRecommendationsForASINsLocaleEnum,
  GetRefinementsForCategoryLocaleEnum,
  GetTargetableCategoriesLocaleEnum,
} from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

/**
 * Module for managing product targeting in Amazon Sponsored Products campaigns.
 *
 * This module provides functionality to:
 * - Get category recommendations for ASINs
 * - Get negative brand recommendations
 * - Get refinements for categories
 * - Get targetable ASIN counts
 * - Get targetable categories
 * - Search brands for negative targeting
 *
 * API Version: v3
 * Content-Type: application/vnd.spproducttargeting.v3+json
 *
 * Required Permissions:
 * - advertiser_campaign_edit: For create and update operations
 * - advertiser_campaign_view: For list and view operations
 */
export class ProductTargetingModule extends BaseApi {
  private api: ProductTargetingApi;

  constructor(config: BaseConfig) {
    super(config);
    this.api = new ProductTargetingApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spproducttargeting.v3+json';
      config.headers['Accept'] = 'application/vnd.spproducttargeting.v3+json';
      return config;
    });
  }

  /**
   * Returns a list of category recommendations for the input list of ASINs.
   * Use this API to discover relevant categories to target.
   * Requires permission: ["advertiser_campaign_edit", "advertiser_campaign_view"]
   */
  async getCategoryRecommendationsForASINs(
    profileId: string,
    request: GetCategoryRecommendationsForAsinsRequest,
    locale?: GetCategoryRecommendationsForASINsLocaleEnum,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.getCategoryRecommendationsForASINs(this.clientId, profileId, undefined, locale, request, options);
  }

  /**
   * Returns brands recommended for negative targeting.
   * Only available for Sellers and Vendors.
   * Requires permission: ["advertiser_campaign_edit", "advertiser_campaign_view"]
   */
  async getNegativeBrands(profileId: string, options?: RawAxiosRequestConfig) {
    return this.api.getNegativeBrands(this.clientId, profileId, undefined, options);
  }

  /**
   * Returns refinements according to category input.
   * Requires permission: ["advertiser_campaign_edit", "advertiser_campaign_view"]
   */
  async getRefinementsForCategory(
    profileId: string,
    categoryId: string,
    locale?: GetRefinementsForCategoryLocaleEnum,
    options?: RawAxiosRequestConfig
  ) {
    return this.api.getRefinementsForCategory(this.clientId, profileId, categoryId, undefined, locale, options);
  }

  /**
   * Get number of targetable ASINs based on refinements provided by the user.
   * Requires permission: ["advertiser_campaign_edit", "advertiser_campaign_view"]
   */
  async getTargetableASINCounts(profileId: string, request: GetTargetableAsinCountsRequest, options?: RawAxiosRequestConfig) {
    return this.api.getTargetableASINCounts(this.clientId, profileId, undefined, request, options);
  }

  /**
   * Returns all targetable categories.
   * Returns a tree of category nodes with category id, name, and child categories.
   * Requires permission: ["advertiser_campaign_edit", "advertiser_campaign_view"]
   */
  async getTargetableCategories(profileId: string, locale?: GetTargetableCategoriesLocaleEnum, options?: RawAxiosRequestConfig) {
    return this.api.getTargetableCategories(this.clientId, profileId, undefined, locale, options);
  }

  /**
   * Returns up to 100 brands related to keyword input for negative targeting.
   * Requires permission: ["advertiser_campaign_edit", "advertiser_campaign_view"]
   */
  async searchBrands(profileId: string, request: SearchBrandsRequest, options?: RawAxiosRequestConfig) {
    return this.api.searchBrands(this.clientId, profileId, undefined, request, options);
  }
}
