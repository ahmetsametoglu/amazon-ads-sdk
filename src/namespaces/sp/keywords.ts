import { BaseConfig } from '../../modules/base';
import {
  KeywordsModule,
  KeywordRecommendationsModule,
  KeywordGroupRecommendationsModule,
  NegativeKeywordsModule,
  CampaignNegativeKeywordsModule,
} from '../../modules/sponsored-products';
import {
  SponsoredProductsCreateSponsoredProductsKeywordsRequestContent,
  SponsoredProductsUpdateSponsoredProductsKeywordsRequestContent,
  SponsoredProductsDeleteSponsoredProductsKeywordsRequestContent,
  SponsoredProductsListSponsoredProductsKeywordsRequestContent,
  SponsoredProductsCreateSponsoredProductsNegativeKeywordsRequestContent as CreateNegativeKeywordRequestContent,
  SponsoredProductsUpdateSponsoredProductsNegativeKeywordsRequestContent as UpdateNegativeKeywordRequestContent,
  SponsoredProductsDeleteSponsoredProductsNegativeKeywordsRequestContent as DeleteNegativeKeywordRequestContent,
  SponsoredProductsListSponsoredProductsNegativeKeywordsRequestContent as ListNegativeKeywordsRequestContent,
  SponsoredProductsCreateSponsoredProductsCampaignNegativeKeywordsRequestContent as CreateCampaignNegativeKeywordRequestContent,
  SponsoredProductsUpdateSponsoredProductsCampaignNegativeKeywordsRequestContent as UpdateCampaignNegativeKeywordRequestContent,
  SponsoredProductsDeleteSponsoredProductsCampaignNegativeKeywordsRequestContent as DeleteCampaignNegativeKeywordRequestContent,
  SponsoredProductsListSponsoredProductsCampaignNegativeKeywordsRequestContent as ListCampaignNegativeKeywordsRequestContent,
  GetRankedKeywordRecommendationRequest,
  GetGlobalRankedKeywordRecommendationRequest,
} from '../../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

export namespace Keywords {
  export class CampaignNegative {
    private readonly module: CampaignNegativeKeywordsModule;

    constructor(config: BaseConfig) {
      this.module = new CampaignNegativeKeywordsModule(config);
    }

    /**
     * Creates new negative keywords for a campaign.
     * Use this to exclude specific search terms from your campaign.
     *
     * @param profileId - The profile ID associated with the campaign
     * @param request - The negative keywords to create
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async create(profileId: string, request: CreateCampaignNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
      return this.module.create(profileId, request, prefer, options);
    }

    /**
     * Removes negative keywords from a campaign.
     * This will stop excluding these search terms from your campaign.
     *
     * @param profileId - The profile ID associated with the campaign
     * @param request - The negative keywords to delete
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async delete(profileId: string, request: DeleteCampaignNegativeKeywordRequestContent, options?: RawAxiosRequestConfig) {
      return this.module.delete(profileId, request, options);
    }

    /**
     * Retrieves all negative keywords for a campaign.
     * Returns a list of search terms that are currently excluded from the campaign.
     *
     * @param profileId - The profile ID associated with the campaign
     * @param request - Optional filters and pagination parameters
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async list(profileId: string, request?: ListCampaignNegativeKeywordsRequestContent, options?: RawAxiosRequestConfig) {
      return this.module.list(profileId, request, options);
    }

    /**
     * Updates existing negative keywords in a campaign.
     * Use this to modify the configuration of excluded search terms.
     *
     * @param profileId - The profile ID associated with the campaign
     * @param request - The updated negative keywords
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async update(profileId: string, request: UpdateCampaignNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
      return this.module.update(profileId, request, prefer, options);
    }
  }

  export class Negative {
    private readonly module: NegativeKeywordsModule;
    private readonly _campaign: CampaignNegative;

    constructor(config: BaseConfig) {
      this.module = new NegativeKeywordsModule(config);
      this._campaign = new CampaignNegative(config);
    }

    /**
     * Creates new negative keywords for ad groups.
     * Use this to exclude specific search terms from your ad groups.
     *
     * @param profileId - The profile ID associated with the ad group
     * @param request - The negative keywords to create
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async create(profileId: string, request: CreateNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
      return this.module.create(profileId, request, prefer, options);
    }

    /**
     * Removes negative keywords from ad groups.
     * This will stop excluding these search terms from your ad groups.
     *
     * @param profileId - The profile ID associated with the ad group
     * @param request - The negative keywords to delete
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async delete(profileId: string, request: DeleteNegativeKeywordRequestContent, options?: RawAxiosRequestConfig) {
      return this.module.delete(profileId, request, options);
    }

    /**
     * Retrieves all negative keywords for ad groups.
     * Returns a list of search terms that are currently excluded from the ad groups.
     *
     * @param profileId - The profile ID associated with the ad group
     * @param request - Optional filters and pagination parameters
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async list(profileId: string, request?: ListNegativeKeywordsRequestContent, options?: RawAxiosRequestConfig) {
      return this.module.list(profileId, request, options);
    }

    /**
     * Updates existing negative keywords in ad groups.
     * Use this to modify the configuration of excluded search terms.
     *
     * @param profileId - The profile ID associated with the ad group
     * @param request - The updated negative keywords
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async update(profileId: string, request: UpdateNegativeKeywordRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
      return this.module.update(profileId, request, prefer, options);
    }

    /**
     * Access to campaign-level negative keyword operations
     */
    public get campaign() {
      return this._campaign;
    }
  }

  export class Recommendations {
    private readonly module: KeywordRecommendationsModule;
    private readonly groupsModule: KeywordGroupRecommendationsModule;

    constructor(config: BaseConfig) {
      this.module = new KeywordRecommendationsModule(config);
      this.groupsModule = new KeywordGroupRecommendationsModule(config);
    }

    /**
     * Gets keyword recommendations for multiple marketplaces.
     * Use this to discover relevant keywords across different regions.
     *
     * @param profileId - The profile ID for the request
     * @param accountId - The account ID for the request
     * @param request - Parameters for global keyword recommendations
     * @param marketplaceId - Optional marketplace ID
     * @param advertiserId - Optional advertiser ID
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async getGlobalRecommendations(
      profileId: string,
      accountId: string,
      request: GetGlobalRankedKeywordRecommendationRequest,
      marketplaceId?: string,
      advertiserId?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.getGlobalRecommendations(profileId, accountId, request, marketplaceId, advertiserId, options);
    }

    /**
     * Gets keyword recommendations for a single marketplace.
     * Use this to discover relevant keywords for your targeting.
     *
     * @param profileId - The profile ID for the request
     * @param request - Parameters for keyword recommendations
     * @param marketplaceId - Optional marketplace ID
     * @param advertiserId - Optional advertiser ID
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async getRecommendations(
      profileId: string,
      request: GetRankedKeywordRecommendationRequest,
      marketplaceId?: string,
      advertiserId?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.getRecommendations(profileId, request, marketplaceId, advertiserId, options);
    }

    /**
     * Access to keyword group recommendation operations
     */
    public get groups() {
      return this.groupsModule;
    }
  }

  export class API {
    private readonly module: KeywordsModule;
    public readonly recommendations: Recommendations;
    public readonly negative: Negative;

    constructor(config: BaseConfig) {
      this.module = new KeywordsModule(config);
      this.recommendations = new Recommendations(config);
      this.negative = new Negative(config);
    }

    /**
     * Creates new keywords for sponsored products.
     * Use this to add keywords for targeting your ads.
     *
     * @param profileId - The profile ID for the request
     * @param request - The keywords to create
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async create(
      profileId: string,
      request: SponsoredProductsCreateSponsoredProductsKeywordsRequestContent,
      prefer?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.create(profileId, request, prefer, options);
    }

    /**
     * Updates existing keywords for sponsored products.
     * Use this to modify your keyword targeting settings.
     *
     * @param profileId - The profile ID for the request
     * @param request - The updated keywords
     * @param prefer - Preference header for response format
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async update(
      profileId: string,
      request: SponsoredProductsUpdateSponsoredProductsKeywordsRequestContent,
      prefer?: string,
      options?: RawAxiosRequestConfig
    ) {
      return this.module.update(profileId, request, prefer, options);
    }

    /**
     * Removes keywords from sponsored products.
     * This will stop targeting these keywords in your ads.
     *
     * @param profileId - The profile ID for the request
     * @param request - The keywords to delete
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit
     */
    async delete(profileId: string, request: SponsoredProductsDeleteSponsoredProductsKeywordsRequestContent, options?: RawAxiosRequestConfig) {
      return this.module.delete(profileId, request, options);
    }

    /**
     * Retrieves all keywords for sponsored products.
     * Returns a list of all active keyword targeting settings.
     *
     * @param profileId - The profile ID for the request
     * @param request - Optional filters and pagination parameters
     * @param options - Additional request configuration
     *
     * @requires permission: advertiser_campaign_edit, advertiser_campaign_view
     */
    async list(profileId: string, request?: SponsoredProductsListSponsoredProductsKeywordsRequestContent, options?: RawAxiosRequestConfig) {
      return this.module.list(profileId, request, options);
    }
  }
}
