import {
  SponsoredProductsCreateSponsoredProductsCampaignNegativeKeywordsRequestContent,
  SponsoredProductsDeleteSponsoredProductsCampaignNegativeKeywordsRequestContent,
  SponsoredProductsListSponsoredProductsCampaignNegativeKeywordsRequestContent,
  SponsoredProductsUpdateSponsoredProductsCampaignNegativeKeywordsRequestContent,
  SponsoredProductsCreateOrUpdateEntityState,
  SponsoredProductsCampaignNegativeKeyword,
  SponsoredProductsCreateOrUpdateNegativeMatchType,
} from '../../generated/sponsored-products';
import { getTestConfig, TestConfig } from './test-utils/setup';

describe('CampaignNegativeKeywordsModule Integration Tests', () => {
  let testConfig: TestConfig;
  let createdCampaignNegativeKeywordId: string;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  describe('CRUD Operations', () => {
    it('should create a new campaign negative keyword', async () => {
      const content: SponsoredProductsCreateSponsoredProductsCampaignNegativeKeywordsRequestContent = {
        campaignNegativeKeywords: [
          {
            campaignId: testConfig.campaignId,
            state: SponsoredProductsCreateOrUpdateEntityState.Enabled,
            keywordText: `test campaign negative keyword ${Date.now()}`,
            matchType: SponsoredProductsCreateOrUpdateNegativeMatchType.NegativeExact,
          },
        ],
      };

      const response = await testConfig.sdk.campaignNegativeKeywords.create(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const successResults = response.data.campaignNegativeKeywords.success;
      expect(Array.isArray(successResults)).toBe(true);
      expect(successResults).toHaveLength(1);

      const successResult = successResults?.[0];
      if (!successResult) throw new Error('Campaign Negative Keyword oluşturulamadı');
      expect(successResult).toBeDefined();
      expect(successResult.campaignNegativeKeywordId).toBeDefined();

      if (successResult.campaignNegativeKeywordId) createdCampaignNegativeKeywordId = successResult.campaignNegativeKeywordId;
    }, 30000);

    it('should list campaign negative keywords and find the created one', async () => {
      const content: SponsoredProductsListSponsoredProductsCampaignNegativeKeywordsRequestContent = {
        campaignIdFilter: { include: [testConfig.campaignId] },
      };

      const response = await testConfig.sdk.campaignNegativeKeywords.list(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const campaignNegativeKeywords = response.data.campaignNegativeKeywords as SponsoredProductsCampaignNegativeKeyword[];
      expect(Array.isArray(campaignNegativeKeywords)).toBe(true);

      const foundCampaignNegativeKeyword = campaignNegativeKeywords.find(kw => kw.keywordId === createdCampaignNegativeKeywordId);
      expect(foundCampaignNegativeKeyword).toBeDefined();
    }, 30000);

    it('should update the created campaign negative keyword', async () => {
      const content: SponsoredProductsUpdateSponsoredProductsCampaignNegativeKeywordsRequestContent = {
        campaignNegativeKeywords: [
          {
            keywordId: createdCampaignNegativeKeywordId,
            state: SponsoredProductsCreateOrUpdateEntityState.Paused,
          },
        ],
      };

      const response = await testConfig.sdk.campaignNegativeKeywords.update(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const successResults = response.data.campaignNegativeKeywords.success;
      expect(Array.isArray(successResults)).toBe(true);
      expect(successResults).toHaveLength(1);
    }, 30000);

    it('should delete the created campaign negative keyword', async () => {
      const content: SponsoredProductsDeleteSponsoredProductsCampaignNegativeKeywordsRequestContent = {
        campaignNegativeKeywordIdFilter: {
          include: [createdCampaignNegativeKeywordId],
        },
      };

      const response = await testConfig.sdk.campaignNegativeKeywords.delete(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();
      expect(response.status).toBe(207);
    }, 30000);
  });
});
