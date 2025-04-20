import { getTestConfig, TestConfig } from './test-utils/setup';

describe('ProductRecommendationsModule', () => {
  let testConfig: TestConfig;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  it('should get product recommendations', async () => {
    const response = await testConfig.sdk.productRecommendations
      .getProductRecommendations(testConfig.profileId, {
        adAsins: ['B0F54QP21F'],
      })
      .catch(error => {
        debugger;
        throw error;
      });

    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data.recommendations)).toBe(true);
  }, 30000);
});
