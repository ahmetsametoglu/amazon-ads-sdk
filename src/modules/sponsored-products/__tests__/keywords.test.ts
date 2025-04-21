import {
  SponsoredProductsCreateSponsoredProductsKeywordsRequestContent,
  SponsoredProductsDeleteSponsoredProductsKeywordsRequestContent,
  SponsoredProductsListSponsoredProductsKeywordsRequestContent,
  SponsoredProductsUpdateSponsoredProductsKeywordsRequestContent,
  SponsoredProductsCreateOrUpdateEntityState,
  SponsoredProductsKeyword,
  SponsoredProductsKeywordMatchType,
} from '../../../generated/sponsored-products';
import { getTestConfig, TestConfig } from './test-utils/setup';

describe('KeywordsModule Integration Tests', () => {
  let testConfig: TestConfig;
  let createdKeywordId: string;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  describe('CRUD Operations', () => {
    it('should create a new keyword', async () => {
      const content: SponsoredProductsCreateSponsoredProductsKeywordsRequestContent = {
        keywords: [
          {
            campaignId: testConfig.campaignId,
            adGroupId: testConfig.adGroupId,
            state: SponsoredProductsCreateOrUpdateEntityState.Enabled,
            keywordText: `test keyword ${Date.now()}`,
            matchType: SponsoredProductsKeywordMatchType.Exact,
            bid: 1.0,
          },
        ],
      };

      const response = await testConfig.sdk.keywords.create(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const successResults = response.data.keywords.success;
      expect(Array.isArray(successResults)).toBe(true);
      expect(successResults).toHaveLength(1);

      const successResult = successResults?.[0];
      if (!successResult) throw new Error('Keyword oluşturulamadı');
      expect(successResult).toBeDefined();
      expect(successResult.keywordId).toBeDefined();

      if (successResult.keywordId) createdKeywordId = successResult.keywordId;
      else throw new Error('Keyword ID bulunamadı');
    }, 30000);

    it('should list keywords and find the created one', async () => {
      expect(createdKeywordId).toBeDefined();

      const content: SponsoredProductsListSponsoredProductsKeywordsRequestContent = {
        campaignIdFilter: { include: [testConfig.campaignId] },
        adGroupIdFilter: { include: [testConfig.adGroupId] },
      };

      const response = await testConfig.sdk.keywords.list(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const keywords = response.data.keywords as SponsoredProductsKeyword[];
      expect(Array.isArray(keywords)).toBe(true);

      const foundKeyword = keywords.find(keyword => keyword.keywordId === createdKeywordId);
      expect(foundKeyword).toBeDefined();
    }, 30000);

    it('should update the created keyword', async () => {
      expect(createdKeywordId).toBeDefined();

      const content: SponsoredProductsUpdateSponsoredProductsKeywordsRequestContent = {
        keywords: [
          {
            keywordId: createdKeywordId,
            state: SponsoredProductsCreateOrUpdateEntityState.Paused,
            bid: 2.0,
          },
        ],
      };

      const response = await testConfig.sdk.keywords.update(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const successResults = response.data.keywords.success;
      expect(Array.isArray(successResults)).toBe(true);
      expect(successResults).toHaveLength(1);

      const successResult = successResults?.[0];
      if (!successResult) throw new Error('Keyword güncellenemedi');
      expect(successResult).toBeDefined();
    }, 30000);

    it('should delete the created keyword', async () => {
      expect(createdKeywordId).toBeDefined();

      const content: SponsoredProductsDeleteSponsoredProductsKeywordsRequestContent = {
        keywordIdFilter: {
          include: [createdKeywordId],
        },
      };

      const response = await testConfig.sdk.keywords.delete(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();
      expect(response.status).toBe(207);
    }, 30000);
  });
});
