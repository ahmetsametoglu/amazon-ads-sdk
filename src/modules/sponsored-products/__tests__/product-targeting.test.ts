import { getTestConfig, TestConfig } from './test-utils/setup';

describe('ProductTargetingModule', () => {
  let testConfig: TestConfig;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  it('should get category recommendations for ASINs', async () => {
    const response = await testConfig.sdk.targeting.product
      .getCategoryRecommendations(testConfig.profileId, {
        asins: ['B0F54QP21F'],
      })
      .catch(error => {
        debugger;
        throw error;
      });

    expect(response.data).toBeDefined();
    expect(response.data.categories?.length).toBeGreaterThan(0);
  }, 30000);

  it('should get negative brands', async () => {
    const response = await testConfig.sdk.targeting.product.getNegativeBrands(testConfig.profileId).catch(error => {
      debugger;
      throw error;
    });

    expect(response.data).toBeDefined();
    expect(response.data.length).toBeGreaterThan(0);
  }, 30000);

  it('should get refinements for categories', async () => {
    const response = await testConfig.sdk.targeting.product.getRefinements(testConfig.profileId, '3138220031').catch(error => {
      debugger;
      throw error;
    });

    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data.brands)).toBe(true);
  }, 30000);

  it('should get targetable ASIN counts', async () => {
    const response = await testConfig.sdk.targeting.product
      .getASINCounts(testConfig.profileId, {
        category: '3138220031',
      })
      .catch(error => {
        debugger;
        throw error;
      });

    expect(response.data).toBeDefined();
    expect(response.data.asinCounts).toBeDefined();
  }, 30000);

  it('should get targetable categories', async () => {
    const response = await testConfig.sdk.targeting.product.getCategories(testConfig.profileId).catch(error => {
      debugger;
      throw error;
    });

    expect(response.data).toBeDefined();
    expect(typeof response.data.categoryTree).toBe('string');
  }, 30000);

  it('should search brands', async () => {
    const response = await testConfig.sdk.targeting.product
      .searchBrands(testConfig.profileId, {
        keyword: 'samsung',
      })
      .catch(error => {
        debugger;
        throw error;
      });

    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
  }, 30000);
});
