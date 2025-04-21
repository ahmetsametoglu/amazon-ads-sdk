import {
  SponsoredProductsCreateSponsoredProductsCampaignsRequestContent,
  SponsoredProductsDeleteSponsoredProductsCampaignsRequestContent,
  SponsoredProductsListSponsoredProductsCampaignsRequestContent,
  SponsoredProductsUpdateSponsoredProductsCampaignsRequestContent,
  SponsoredProductsCreateOrUpdateEntityState,
  SponsoredProductsCampaign,
} from '../../../generated/sponsored-products';
import { getTestConfig, TestConfig } from './test-utils/setup';

describe('CampaignsModule Integration Tests', () => {
  let testConfig: TestConfig;
  let createdCampaignId: string;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  describe('CRUD Operations', () => {
    it('should create a new campaign', async () => {
      const content: SponsoredProductsCreateSponsoredProductsCampaignsRequestContent = {
        campaigns: [
          {
            name: `Test Campaign ${Date.now()}`,
            state: SponsoredProductsCreateOrUpdateEntityState.Enabled,
            targetingType: 'MANUAL',
            dynamicBidding: {
              strategy: 'LEGACY_FOR_SALES',
            },
            budget: {
              budgetType: 'DAILY',
              budget: 5,
            },
          },
        ],
      };

      const response = await testConfig.sdk.campaigns.create(testConfig.profileId, content);
      expect(response.data).toBeDefined();

      const campaigns = response.data.campaigns as SponsoredProductsCampaign[];
      expect(Array.isArray(campaigns)).toBe(true);
      expect(campaigns).toHaveLength(1);

      const createdCampaign = campaigns[0];
      expect(createdCampaign).toBeDefined();
      expect(createdCampaign.name).toContain('Test Campaign');

      if (createdCampaign.campaignId) {
        createdCampaignId = createdCampaign.campaignId;
      } else {
        throw new Error('Campaign ID not found');
      }
    }, 30000);

    it('should list campaigns and find the created one', async () => {
      const content: SponsoredProductsListSponsoredProductsCampaignsRequestContent = {};

      const response = await testConfig.sdk.campaigns.list(testConfig.profileId, content);
      expect(response.data).toBeDefined();

      const campaigns = response.data.campaigns as SponsoredProductsCampaign[];
      expect(Array.isArray(campaigns)).toBe(true);

      const foundCampaign = campaigns.find(campaign => campaign.campaignId === createdCampaignId);
      expect(foundCampaign).toBeDefined();
    }, 30000);

    it('should update the created campaign', async () => {
      const newName = `Updated Campaign ${Date.now()}`;
      const content: SponsoredProductsUpdateSponsoredProductsCampaignsRequestContent = {
        campaigns: [
          {
            campaignId: createdCampaignId,
            name: newName,
            budget: {
              budgetType: 'DAILY',
              budget: 10,
            },
          },
        ],
      };

      const response = await testConfig.sdk.campaigns.update(testConfig.profileId, content);
      expect(response.data).toBeDefined();

      const campaigns = response.data.campaigns as SponsoredProductsCampaign[];
      expect(Array.isArray(campaigns)).toBe(true);
      expect(campaigns).toHaveLength(1);

      const updatedCampaign = campaigns[0];
      expect(updatedCampaign).toBeDefined();
      expect(updatedCampaign.name).toBe(newName);
    }, 30000);

    it('should delete the created campaign', async () => {
      const content: SponsoredProductsDeleteSponsoredProductsCampaignsRequestContent = {
        campaignIdFilter: {
          include: [createdCampaignId],
        },
      };

      const response = await testConfig.sdk.campaigns.delete(testConfig.profileId, content);
      expect(response.data).toBeDefined();
      expect(response.status).toBe(200);
    }, 30000);
  });
});
