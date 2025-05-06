import { AsyncReportConfiguration, CreateAsyncReportRequest } from '../../generated/reports';

/**
 * Amazon Advertising API Report Type ID'leri
 * Her bir reportTypeId'nin açıklaması ve dokümantasyon linki aşağıda verilmiştir.
 *
 * targeting: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/targeting
 *   - 'spTargeting': Sponsored Products Targeting
 *   - 'sbTargeting': Sponsored Brands Targeting
 *   - 'sdTargeting': Sponsored Display Targeting
 *   - 'stTargeting': Sponsored Television Targeting
 *
 * tech: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/tech
 *   - 'dspTech': DSP Tech
 *
 * search-term: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/search-term
 *   - 'spSearchTerm': Sponsored Products Search Term
 *   - 'sbSearchTerm': Sponsored Brands Search Term
 *
 * reach: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/reach
 *   - 'dspReachFrequency': DSP Reach Frequency
 *
 * purchased-product: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/purchased-product
 *   - 'spPurchasedProduct': Sponsored Products Purchased Product
 *   - 'sbPurchasedProduct': Sponsored Brands Purchased Product
 *   - 'sdPurchasedProduct': Sponsored Display Purchased Product
 *
 * product: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/product
 *   - 'dspProduct': DSP Product
 *
 * placement: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/placement
 *   - 'sbCampaignPlacement': Sponsored Brands Campaign Placement
 *
 * inventory: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/inventory
 *   - 'dspInventory': DSP Inventory
 *
 * gross-and-invalid-traffic: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/gross-and-invalid-traffic
 *   - 'spGrossAndInvalids': Sponsored Products Gross & Invalids
 *   - 'sbGrossAndInvalids': Sponsored Brands Gross & Invalids
 *   - 'sdGrossAndInvalids': Sponsored Display Gross & Invalids
 *
 * geo: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/geo
 *   - 'dspGeo': DSP Geo
 *
 * campaign: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/campaign
 *   - 'spCampaigns': Sponsored Products Campaigns
 *   - 'sbCampaigns': Sponsored Brands Campaigns
 *   - 'sdCampaigns': Sponsored Display Campaigns
 *   - 'stCampaigns': Sponsored Television Campaigns
 *   - 'dspCampaign': DSP Campaign
 *
 * bid-adjustment: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/bid-adjustment
 *   - 'dspBidAdjustment': DSP Bid Adjustment
 *
 * audio-and-video: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/audio-and-video
 *   - 'dspAudioAndVideo': DSP Audio & Video
 *
 * audience: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/audience
 *   - 'dspAudience': DSP Audience
 *   - 'spAudiences': Sponsored Products Audiences
 *   - 'sbAudiences': Sponsored Brands Audiences
 *
 * advertised-product: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/advertised-product
 *   - 'spAdvertisedProduct': Sponsored Products Advertised Product
 *   - 'sdAdvertisedProduct': Sponsored Display Advertised Product
 *
 * ad-group: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/ad-group
 *   - 'sbAdGroup': Sponsored Brands Ad Group
 *   - 'sdAdGroup': Sponsored Display Ad Group
 *
 * ad: https://advertising.amazon.com/API/docs/en-us/guides/reporting/v3/report-types/ad
 *   - 'sbAds': Sponsored Brands Ads
 */
type ReportIds =
  // targeting
  | 'spTargeting'
  | 'sbTargeting'
  | 'sdTargeting'
  | 'stTargeting'
  // tech
  | 'dspTech'
  // search-term
  | 'spSearchTerm'
  | 'sbSearchTerm'
  // reach
  | 'dspReachFrequency'
  // purchased-product
  | 'spPurchasedProduct'
  | 'sbPurchasedProduct'
  | 'sdPurchasedProduct'
  // product
  | 'dspProduct'
  // placement
  | 'sbCampaignPlacement'
  // inventory
  | 'dspInventory'
  // gross-and-invalid-traffic
  | 'spGrossAndInvalids'
  | 'sbGrossAndInvalids'
  | 'sdGrossAndInvalids'
  // geo
  | 'dspGeo'
  // campaign
  | 'spCampaigns'
  | 'sbCampaigns'
  | 'sdCampaigns'
  | 'stCampaigns'
  | 'dspCampaign'
  // bid-adjustment
  | 'dspBidAdjustment'
  // audio-and-video
  | 'dspAudioAndVideo'
  // audience
  | 'dspAudience'
  | 'spAudiences'
  | 'sbAudiences'
  // advertised-product
  | 'spAdvertisedProduct'
  | 'sdAdvertisedProduct'
  // ad-group
  | 'sbAdGroup'
  | 'sdAdGroup'
  // ad
  | 'sbAds';

/**
 * Parameters used for report creation request
 */
export interface CreateReportBody {
  /**
   * Name of the report (optional). Can be used to identify the report more easily.
   */
  name?: string;
  /**
   * End date of the report period (in YYYY-MM-DD format). The maximum lookback window depends on the reportTypeId.
   */
  endDate: string;
  /**
   * Start date of the report period (in YYYY-MM-DD format). The maximum lookback window depends on the reportTypeId.
   */
  startDate: string;
  /**
   * Configuration for the report
   */
  configuration: AsyncReportConfiguration & {
    reportTypeId: ReportIds;
  };
}
