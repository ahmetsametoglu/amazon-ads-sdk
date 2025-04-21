import { BaseConfig } from '../../modules/base';
import {
  TargetingModule,
  ProductTargetingModule,
  TargetPromotionGroupsModule,
  NegativeTargetingModule,
  CampaignNegativeTargetingModule,
} from '../../modules/sponsored-products';
import {
  SponsoredProductsCreateSponsoredProductsTargetingClausesRequestContent,
  SponsoredProductsUpdateSponsoredProductsTargetingClausesRequestContent,
  SponsoredProductsDeleteSponsoredProductsTargetingClausesRequestContent,
  SponsoredProductsListSponsoredProductsTargetingClausesRequestContent,
  GetCategoryRecommendationsForAsinsRequest,
  GetTargetableAsinCountsRequest,
  SearchBrandsRequest,
  GetCategoryRecommendationsForASINsLocaleEnum,
  GetRefinementsForCategoryLocaleEnum,
  GetTargetableCategoriesLocaleEnum,
  SponsoredProductsCreateSponsoredProductsNegativeTargetingClausesRequestContent,
  SponsoredProductsDeleteSponsoredProductsNegativeTargetingClausesRequestContent,
  SponsoredProductsListSponsoredProductsNegativeTargetingClausesRequestContent,
  SponsoredProductsUpdateSponsoredProductsNegativeTargetingClausesRequestContent,
  SponsoredProductsCreateSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
  SponsoredProductsDeleteSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
  SponsoredProductsListSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
  SponsoredProductsUpdateSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
} from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

export namespace Targeting {
  export class CampaignNegative {
    private readonly module: CampaignNegativeTargetingModule;

    constructor(config: BaseConfig) {
      this.module = new CampaignNegativeTargetingModule(config);
    }

    /**
     * Creates new negative targeting clauses for a campaign.
     * Use this to exclude specific targets from your campaign.
     *
     * @param profileId - The profile ID associated with the campaign
     * @param request - The negative targeting clauses to create
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async create(
      profileId: string,
      request: SponsoredProductsCreateSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
      prefer?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.createCampaignNegativeTargetingClauses(profileId, request, prefer, options);
    }

    /**
     * Removes negative targeting clauses from a campaign.
     * This will stop excluding the specified targets from your campaign.
     *
     * @param profileId - The profile ID associated with the campaign
     * @param request - The negative targeting clauses to delete
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async delete(
      profileId: string,
      request: SponsoredProductsDeleteSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.deleteCampaignNegativeTargetingClauses(profileId, request, options);
    }

    /**
     * Retrieves all negative targeting clauses for a campaign.
     * Returns a list of targets that are currently excluded from the campaign.
     *
     * @param profileId - The profile ID associated with the campaign
     * @param request - Optional filters and pagination parameters
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async list(
      profileId: string,
      request?: SponsoredProductsListSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.listCampaignNegativeTargetingClauses(profileId, request, options);
    }

    /**
     * Modifies existing negative targeting clauses in a campaign.
     * Use this to update the configuration of excluded targets.
     *
     * @param profileId - The profile ID associated with the campaign
     * @param request - The updated negative targeting clauses
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async update(
      profileId: string,
      request: SponsoredProductsUpdateSponsoredProductsCampaignNegativeTargetingClausesRequestContent,
      prefer?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.updateCampaignNegativeTargetingClauses(profileId, request, prefer, options);
    }
  }

  export class Negative {
    private readonly module: NegativeTargetingModule;
    private readonly _campaign: CampaignNegative;

    constructor(config: BaseConfig) {
      this.module = new NegativeTargetingModule(config);
      this._campaign = new CampaignNegative(config);
    }

    /**
     * Creates new negative targeting clauses for ad groups.
     * Use this to exclude specific targets from your ad groups.
     *
     * @param profileId - The profile ID associated with the ad group
     * @param request - The negative targeting clauses to create
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async create(
      profileId: string,
      request: SponsoredProductsCreateSponsoredProductsNegativeTargetingClausesRequestContent,
      prefer?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.createNegativeTargetingClauses(profileId, request, prefer, options);
    }

    /**
     * Removes negative targeting clauses from ad groups.
     * This will stop excluding the specified targets from your ad groups.
     *
     * @param profileId - The profile ID associated with the ad group
     * @param request - The negative targeting clauses to delete
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async delete(
      profileId: string,
      request: SponsoredProductsDeleteSponsoredProductsNegativeTargetingClausesRequestContent,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.deleteNegativeTargetingClauses(profileId, request, options);
    }

    /**
     * Retrieves all negative targeting clauses for ad groups.
     * Returns a list of targets that are currently excluded from the ad groups.
     *
     * @param profileId - The profile ID associated with the ad group
     * @param request - Optional filters and pagination parameters
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async list(
      profileId: string,
      request?: SponsoredProductsListSponsoredProductsNegativeTargetingClausesRequestContent,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.listNegativeTargetingClauses(profileId, request, options);
    }

    /**
     * Modifies existing negative targeting clauses in ad groups.
     * Use this to update the configuration of excluded targets.
     *
     * @param profileId - The profile ID associated with the ad group
     * @param request - The updated negative targeting clauses
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async update(
      profileId: string,
      request: SponsoredProductsUpdateSponsoredProductsNegativeTargetingClausesRequestContent,
      prefer?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.updateNegativeTargetingClauses(profileId, request, prefer, options);
    }

    /**
     * Access to campaign-level negative targeting operations
     */
    public get campaign() {
      return this._campaign;
    }
  }

  export class Product {
    private readonly module: ProductTargetingModule;
    private readonly promotionsModule: TargetPromotionGroupsModule;

    constructor(config: BaseConfig) {
      this.module = new ProductTargetingModule(config);
      this.promotionsModule = new TargetPromotionGroupsModule(config);
    }

    /**
     * Retrieves category recommendations for specified ASINs.
     * Use this to discover relevant categories for targeting based on your product ASINs.
     *
     * @param profileId - The profile ID for the request
     * @param request - List of ASINs to get recommendations for
     * @param locale - Language for the response content
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async getCategoryRecommendations(
      profileId: string,
      request: GetCategoryRecommendationsForAsinsRequest,
      locale?: GetCategoryRecommendationsForASINsLocaleEnum,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.getCategoryRecommendationsForASINs(profileId, request, locale, options);
    }

    /**
     * Retrieves a list of brands recommended for negative targeting.
     * Available only for Sellers and Vendors.
     *
     * @param profileId - The profile ID for the request
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async getNegativeBrands(profileId: string, options?: RawAxiosRequestConfig) {
      return this.module.getNegativeBrands(profileId, options);
    }

    /**
     * Retrieves refinements for a specific category.
     * Use this to get detailed targeting options within a category.
     *
     * @param profileId - The profile ID for the request
     * @param categoryId - The category to get refinements for
     * @param locale - Language for the response content
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async getRefinements(profileId: string, categoryId: string, locale?: GetRefinementsForCategoryLocaleEnum, options?: RawAxiosRequestConfig) {
      return this.module.getRefinementsForCategory(profileId, categoryId, locale, options);
    }

    /**
     * Gets the count of targetable ASINs based on specified criteria.
     * Use this to understand the reach of your targeting options.
     *
     * @param profileId - The profile ID for the request
     * @param request - Targeting criteria to count ASINs for
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async getASINCounts(profileId: string, request: GetTargetableAsinCountsRequest, options?: RawAxiosRequestConfig) {
      return this.module.getTargetableASINCounts(profileId, request, options);
    }

    /**
     * Retrieves all categories available for targeting.
     * Returns a hierarchical tree of targetable categories.
     *
     * @param profileId - The profile ID for the request
     * @param locale - Language for the response content
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async getCategories(profileId: string, locale?: GetTargetableCategoriesLocaleEnum, options?: RawAxiosRequestConfig) {
      return this.module.getTargetableCategories(profileId, locale, options);
    }

    /**
     * Searches for brands that can be targeted.
     * Returns up to 100 brands matching the search criteria.
     *
     * @param profileId - The profile ID for the request
     * @param request - Search criteria for finding brands
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async searchBrands(profileId: string, request: SearchBrandsRequest, options?: RawAxiosRequestConfig) {
      return this.module.searchBrands(profileId, request, options);
    }

    /**
     * Access to promotion targeting operations
     */
    public get promotions() {
      return this.promotionsModule;
    }
  }

  export class API {
    private readonly module: TargetingModule;
    public readonly product: Product;
    public readonly negative: Negative;

    constructor(config: BaseConfig) {
      this.module = new TargetingModule(config);
      this.product = new Product(config);
      this.negative = new Negative(config);
    }

    /**
     * Creates new targeting clauses for sponsored products.
     * Use this to specify which products or categories to target.
     *
     * @param profileId - The profile ID for the request
     * @param request - The targeting clauses to create
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async create(
      profileId: string,
      request: SponsoredProductsCreateSponsoredProductsTargetingClausesRequestContent,
      prefer?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.createTargetingClauses(profileId, request, prefer, options);
    }

    /**
     * Updates existing targeting clauses for sponsored products.
     * Use this to modify your targeting settings.
     *
     * @param profileId - The profile ID for the request
     * @param request - The updated targeting clauses
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async update(
      profileId: string,
      request: SponsoredProductsUpdateSponsoredProductsTargetingClausesRequestContent,
      prefer?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.updateTargetingClauses(profileId, request, prefer, options);
    }

    /**
     * Removes targeting clauses from sponsored products.
     * This will stop targeting the specified products or categories.
     *
     * @param profileId - The profile ID for the request
     * @param request - The targeting clauses to delete
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async delete(
      profileId: string,
      request: SponsoredProductsDeleteSponsoredProductsTargetingClausesRequestContent,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.deleteTargetingClauses(profileId, request, options);
    }

    /**
     * Retrieves all targeting clauses for sponsored products.
     * Returns a list of all active targeting settings.
     *
     * @param profileId - The profile ID for the request
     * @param request - Optional filters and pagination parameters
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async list(profileId: string, request?: SponsoredProductsListSponsoredProductsTargetingClausesRequestContent, options?: RawAxiosRequestConfig) {
      return this.module.listTargetingClauses(profileId, request, options);
    }
  }
}
