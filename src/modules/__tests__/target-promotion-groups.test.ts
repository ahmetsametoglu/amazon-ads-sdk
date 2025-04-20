import {
  SponsoredProductsListTargetPromotionGroupsV2RequestContent,
  SponsoredProductsCreateTargetPromotionGroupsV2RequestContent,
  SponsoredProductsGetTargetPromotionGroupsRecommendationsRequestContent,
  SponsoredProductsCreateTargetPromotionGroupTargetsRequestContent,
  SponsoredProductsCreateTargetRequest,
  SponsoredProductsTargetPromotionGroupV2,
  SponsoredProductsObjectIdFilter,
} from '../../generated/sponsored-products';
import { getTestConfig, TestConfig } from './test-utils/setup';

describe('TargetPromotionGroupsModule Integration Tests', () => {
  let testConfig: TestConfig;
  let createdGroupId: string;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  describe('Target Promotion Groups Operations', () => {
    it('should create a new target promotion group', async () => {
      const content: SponsoredProductsCreateTargetPromotionGroupsV2RequestContent = {
        targetPromotionGroupName: `Test Target Promotion Group ${Date.now()}`,
        adGroupId: testConfig.adGroupId,
        existingCampaignDetails: [
          {
            adGroupId: testConfig.adGroupId,
          },
        ],
      };

      const response = await testConfig.sdk.targetPromotionGroups.create(testConfig.profileId, content).catch(error => {
        debugger;
        throw error;
      });
      expect(response.data).toBeDefined();

      const group = response.data.targetPromotionGroup as SponsoredProductsTargetPromotionGroupV2;
      expect(group).toBeDefined();
      expect(group.targetPromotionGroupId).toBeDefined();

      if (group.targetPromotionGroupId) {
        createdGroupId = group.targetPromotionGroupId;
      } else {
        throw new Error('Target Promotion Group ID bulunamadı');
      }
    }, 30000);

    it('should list target promotion groups and find the created one', async () => {
      const content: SponsoredProductsListTargetPromotionGroupsV2RequestContent = {};

      const response = await testConfig.sdk.targetPromotionGroups.list(testConfig.profileId, content).catch(error => {
        debugger;
        throw error;
      });
      expect(response.data).toBeDefined();
      expect(response.data.targetPromotionGroups).toBeDefined();
      expect(Array.isArray(response.data.targetPromotionGroups)).toBe(true);

      const foundGroup = response.data.targetPromotionGroups?.find(group => group.targetPromotionGroupId === createdGroupId);
      expect(foundGroup).toBeDefined();
    }, 30000);

    it('should create targets for the promotion group', async () => {
      const target: SponsoredProductsCreateTargetRequest = {
        expressionType: 'ASIN_CATEGORY_SAME_AS',
        target: 'B01234567',
      };

      const content: SponsoredProductsCreateTargetPromotionGroupTargetsRequestContent = {
        targetPromotionGroupId: createdGroupId,
        targets: [target],
      };

      const response = await testConfig.sdk.targetPromotionGroups.createTargets(testConfig.profileId, content).catch(error => {
        debugger;
        throw error;
      });
      expect(response.data).toBeDefined();
      expect(response.data.success).toBeDefined();
      expect(Array.isArray(response.data.success)).toBe(true);
    }, 30000);

    it('should list targets for the promotion group', async () => {
      const response = await testConfig.sdk.targetPromotionGroups
        .listTargets(testConfig.profileId, {
          targetPromotionGroupIdFilter: {
            include: [createdGroupId],
          },
        })
        .catch(error => {
          debugger;
          throw error;
        });
      expect(response.data).toBeDefined();
      expect(response.data.targets).toBeDefined();
      expect(Array.isArray(response.data.targets)).toBe(true);
    }, 30000);

    it('should get recommendations for target promotion groups', async () => {
      const campaignIdFilter: SponsoredProductsObjectIdFilter = {
        include: [testConfig.campaignId],
      };

      const content: SponsoredProductsGetTargetPromotionGroupsRecommendationsRequestContent = {
        campaignIdFilter,
        maxResults: 10,
      };

      const response = await testConfig.sdk.targetPromotionGroups.getRecommendations(testConfig.profileId, content).catch(error => {
        debugger;
        throw error;
      });
      expect(response.data).toBeDefined();
      expect(response.data.targets).toBeDefined();
    }, 30000);
  });
});
