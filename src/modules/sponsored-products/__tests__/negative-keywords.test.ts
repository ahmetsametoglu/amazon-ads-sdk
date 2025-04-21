import {
  SponsoredProductsCreateSponsoredProductsNegativeKeywordsRequestContent,
  SponsoredProductsDeleteSponsoredProductsNegativeKeywordsRequestContent,
  SponsoredProductsListSponsoredProductsNegativeKeywordsRequestContent,
  SponsoredProductsUpdateSponsoredProductsNegativeKeywordsRequestContent,
  SponsoredProductsCreateOrUpdateEntityState,
  SponsoredProductsNegativeKeyword,
  SponsoredProductsCreateOrUpdateNegativeMatchType,
} from '../../../generated/sponsored-products';
import { getTestConfig, TestConfig } from './test-utils/setup';

describe('NegativeKeywordsModule Integration Tests', () => {
  let testConfig: TestConfig;
  let createdNegativeKeywordId: string;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  describe('CRUD Operations', () => {
    it('should create a new negative keyword', async () => {
      const content: SponsoredProductsCreateSponsoredProductsNegativeKeywordsRequestContent = {
        negativeKeywords: [
          {
            campaignId: testConfig.campaignId,
            adGroupId: testConfig.adGroupId,
            state: SponsoredProductsCreateOrUpdateEntityState.Enabled,
            keywordText: `test negative keyword ${Date.now()}`,
            matchType: SponsoredProductsCreateOrUpdateNegativeMatchType.NegativeExact,
          },
        ],
      };

      const response = await testConfig.sdk.keywords.negative.create(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const successResults = response.data.negativeKeywords.success;
      expect(Array.isArray(successResults)).toBe(true);
      expect(successResults).toHaveLength(1);

      const successResult = successResults?.[0];
      if (!successResult) throw new Error('Failed to create Negative Keyword');
      expect(successResult).toBeDefined();
      expect(successResult.negativeKeywordId).toBeDefined();

      if (successResult.negativeKeywordId) createdNegativeKeywordId = successResult.negativeKeywordId;
    }, 30000);

    it('should list negative keywords and find the created one', async () => {
      const content: SponsoredProductsListSponsoredProductsNegativeKeywordsRequestContent = {
        campaignIdFilter: { include: [testConfig.campaignId] },
        adGroupIdFilter: { include: [testConfig.adGroupId] },
      };

      const response = await testConfig.sdk.keywords.negative.list(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const negativeKeywords = response.data.negativeKeywords as SponsoredProductsNegativeKeyword[];
      expect(Array.isArray(negativeKeywords)).toBe(true);

      const foundNegativeKeyword = negativeKeywords.find(kw => kw.keywordId === createdNegativeKeywordId);
      expect(foundNegativeKeyword).toBeDefined();
    }, 30000);

    it('should update the created negative keyword', async () => {
      const content: SponsoredProductsUpdateSponsoredProductsNegativeKeywordsRequestContent = {
        negativeKeywords: [
          {
            keywordId: createdNegativeKeywordId,
            state: SponsoredProductsCreateOrUpdateEntityState.Paused,
          },
        ],
      };

      const response = await testConfig.sdk.keywords.negative.update(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const successResults = response.data.negativeKeywords.success;
      expect(Array.isArray(successResults)).toBe(true);
      expect(successResults).toHaveLength(1);
    }, 30000);

    it('should delete the created negative keyword', async () => {
      const content: SponsoredProductsDeleteSponsoredProductsNegativeKeywordsRequestContent = {
        negativeKeywordIdFilter: {
          include: [createdNegativeKeywordId],
        },
      };

      const response = await testConfig.sdk.keywords.negative.delete(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();
      expect(response.status).toBe(207);
    }, 30000);
  });
});
