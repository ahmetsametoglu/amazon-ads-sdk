import { getTestConfig, TestConfig } from './test-utils/setup';

describe('KeywordGroupRecommendationsModule', () => {
  let testConfig: TestConfig;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  it('should get keyword group recommendations', async () => {
    const response = await testConfig.sdk.keywords.recommendations.groups
      .getKeywordGroupRecommendations(
        testConfig.profileId,
        {
          asins: ['B0F54QP21F'],
        },
        'en-US'
      )
      .catch(error => {
        debugger;
        throw error;
      });

    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data.keywordGroups)).toBe(true);
  }, 30000);
});
