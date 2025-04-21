import { getTestConfig, TestConfig } from './test-utils/setup';

describe('BudgetUsageModule', () => {
  let testConfig: TestConfig;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  it('should get campaigns budget usage', async () => {
    const response = await testConfig.sdk.campaigns.budget
      .getUsage(testConfig.profileId, {
        campaignIds: [testConfig.campaignId],
      })
      .catch(error => {
        debugger;
        throw error;
      });

    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data.success)).toBe(true);
  }, 30000);
});
