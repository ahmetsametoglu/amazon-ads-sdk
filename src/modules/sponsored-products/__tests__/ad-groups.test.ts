import {
  SponsoredProductsCreateSponsoredProductsAdGroupsRequestContent,
  SponsoredProductsDeleteSponsoredProductsAdGroupsRequestContent,
  SponsoredProductsListSponsoredProductsAdGroupsRequestContent,
  SponsoredProductsUpdateSponsoredProductsAdGroupsRequestContent,
  SponsoredProductsCreateOrUpdateEntityState,
  SponsoredProductsAdGroup,
} from '../../../generated/sponsored-products';
import { getTestConfig, TestConfig } from './test-utils/setup';

describe('AdGroupsModule Integration Tests', () => {
  let testConfig: TestConfig;
  let createdAdGroupId: string;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  describe('CRUD Operations', () => {
    it('should create a new ad group', async () => {
      const content: SponsoredProductsCreateSponsoredProductsAdGroupsRequestContent = {
        adGroups: [
          {
            name: `Test Ad Group ${Date.now()}`,
            campaignId: testConfig.campaignId,
            defaultBid: 1.0,
            state: SponsoredProductsCreateOrUpdateEntityState.Enabled,
          },
        ],
      };

      const response = await testConfig.sdk.adGroups.create(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const successResults = response.data.adGroups.success;
      expect(Array.isArray(successResults)).toBe(true);
      expect(successResults).toHaveLength(1);

      const successResult = successResults?.[0];
      if (!successResult) throw new Error('Failed to create Ad Group');
      expect(successResult).toBeDefined();

      if (successResult.adGroupId) createdAdGroupId = successResult.adGroupId;
      else throw new Error('Ad Group ID not found');
    }, 30000);

    it('should list ad groups and find the created one', async () => {
      const content: SponsoredProductsListSponsoredProductsAdGroupsRequestContent = {
        campaignIdFilter: { include: [testConfig.campaignId] },
      };

      const response = await testConfig.sdk.adGroups.list(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const adGroups = response.data.adGroups as SponsoredProductsAdGroup[];
      expect(Array.isArray(adGroups)).toBe(true);

      const foundAdGroup = adGroups.find(adGroup => adGroup.adGroupId === createdAdGroupId);
      expect(foundAdGroup).toBeDefined();
    }, 30000);

    it('should update the created ad group', async () => {
      const newName = `Updated Ad Group ${Date.now()}`;
      const content: SponsoredProductsUpdateSponsoredProductsAdGroupsRequestContent = {
        adGroups: [
          {
            adGroupId: createdAdGroupId,
            name: newName,
            defaultBid: 2.0,
          },
        ],
      };

      const response = await testConfig.sdk.adGroups.update(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();

      const successResults = response.data.adGroups.success;
      expect(Array.isArray(successResults)).toBe(true);
      expect(successResults).toHaveLength(1);

      const successResult = successResults?.[0];
      if (!successResult) throw new Error('Failed to update Ad Group');
      expect(successResult).toBeDefined();
      expect(successResult.adGroup?.name).toBe(newName);
    }, 30000);

    it('should delete the created ad group', async () => {
      const content: SponsoredProductsDeleteSponsoredProductsAdGroupsRequestContent = {
        adGroupIdFilter: {
          include: [createdAdGroupId],
        },
      };

      const response = await testConfig.sdk.adGroups.delete(testConfig.profileId, content).catch(e => {
        debugger;
        throw e;
      });
      expect(response.data).toBeDefined();
      expect(response.status).toBe(207);
    }, 30000);
  });
});
