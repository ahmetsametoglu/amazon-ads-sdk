import { GetGlobalRankedKeywordRecommendationRequest, GetRankedKeywordRecommendationRequest } from '../../../generated/sponsored-products';
import { getTestConfig, TestConfig } from './test-utils/setup';

describe('KeywordRecommendationsModule Integration Tests', () => {
  let testConfig: TestConfig;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  describe('Keyword Recommendations Operations', () => {
    it('should get global keyword recommendations', async () => {
      const request: GetGlobalRankedKeywordRecommendationRequest = {
        recommendationType: 'KEYWORDS_FOR_ADGROUP',
        adGroupId: testConfig.adGroupId,
        campaignId: testConfig.campaignId,
        maxRecommendations: 10,
      };

      const response = await testConfig.sdk.keywords.recommendations
        .getGlobal(
          testConfig.profileId,
          testConfig.profileId, // accountId yerine profileId kullanıyoruz
          request
        )
        .catch(e => {
          debugger;
          throw e;
        });

      expect(response.data).toBeDefined();
      expect(response.status).toBe(200);
    }, 30000);

    it('should get keyword recommendations', async () => {
      const request: GetRankedKeywordRecommendationRequest = {
        recommendationType: 'KEYWORDS_FOR_ADGROUP',
        adGroupId: testConfig.adGroupId,
        campaignId: testConfig.campaignId,
        maxRecommendations: 10,
      };

      const response = await testConfig.sdk.keywords.recommendations.get(testConfig.profileId, request).catch(e => {
        debugger;
        throw e;
      });

      expect(response.data).toBeDefined();
      expect(response.status).toBe(200);
    }, 30000);
  });
});
