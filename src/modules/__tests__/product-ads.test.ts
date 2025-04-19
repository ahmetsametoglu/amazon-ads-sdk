import {
  SponsoredProductsCreateSponsoredProductsProductAdsRequestContent,
  SponsoredProductsDeleteSponsoredProductsProductAdsRequestContent,
  SponsoredProductsListSponsoredProductsProductAdsRequestContent,
  SponsoredProductsUpdateSponsoredProductsProductAdsRequestContent,
  SponsoredProductsCreateOrUpdateEntityState,
  SponsoredProductsProductAd,
} from '../../generated/sponsored-products';
import { getTestConfig, TestConfig } from './test-utils/setup';

describe('ProductAdsModule Integration Tests', () => {
  let testConfig: TestConfig;
  let createdProductAdId: string;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  describe('CRUD Operations', () => {
    it('should create a new product ad', async () => {
      const content: SponsoredProductsCreateSponsoredProductsProductAdsRequestContent = {
        productAds: [
          {
            campaignId: testConfig.campaignId,
            adGroupId: testConfig.adGroupId,
            state: SponsoredProductsCreateOrUpdateEntityState.Enabled,
            sku: 'VE24-0006',
          },
        ],
      };

      const response = await testConfig.sdk.productAds.create(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const successResults = response.data.productAds.success;
      expect(Array.isArray(successResults)).toBe(true);
      expect(successResults).toHaveLength(1);

      const successResult = successResults?.[0];
      if (!successResult) throw new Error('Product Ad oluşturulamadı');
      expect(successResult).toBeDefined();
      expect(successResult.adId).toBeDefined();

      if (successResult.adId) createdProductAdId = successResult.adId;
    }, 30000);

    it('should list product ads and find the created one', async () => {
      expect(createdProductAdId).toBeDefined();

      const content: SponsoredProductsListSponsoredProductsProductAdsRequestContent = {
        campaignIdFilter: { include: [testConfig.campaignId] },
        adGroupIdFilter: { include: [testConfig.adGroupId] },
      };

      const response = await testConfig.sdk.productAds.list(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const productAds = response.data.productAds as SponsoredProductsProductAd[];
      expect(Array.isArray(productAds)).toBe(true);

      const foundProductAd = productAds.find(ad => ad.adId === createdProductAdId);
      expect(foundProductAd).toBeDefined();
    }, 30000);

    it('should update the created product ad', async () => {
      expect(createdProductAdId).toBeDefined();

      const content: SponsoredProductsUpdateSponsoredProductsProductAdsRequestContent = {
        productAds: [
          {
            adId: createdProductAdId,
            state: SponsoredProductsCreateOrUpdateEntityState.Paused,
          },
        ],
      };

      const response = await testConfig.sdk.productAds.update(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const successResults = response.data.productAds.success;
      expect(Array.isArray(successResults)).toBe(true);
      expect(successResults).toHaveLength(1);

      const successResult = successResults?.[0];
      if (!successResult) throw new Error('Product Ad güncellenemedi');
      expect(successResult).toBeDefined();
      expect(successResult.productAd?.state).toBe(SponsoredProductsCreateOrUpdateEntityState.Paused);
    }, 30000);

    it('should delete the created product ad', async () => {
      expect(createdProductAdId).toBeDefined();
      const content: SponsoredProductsDeleteSponsoredProductsProductAdsRequestContent = {
        adIdFilter: {
          include: [createdProductAdId],
        },
      };

      const response = await testConfig.sdk.productAds.delete(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();
      expect(response.status).toBe(207);
    }, 30000);
  });
});
