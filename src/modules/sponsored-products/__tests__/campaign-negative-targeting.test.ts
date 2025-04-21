import { getTestConfig, TestConfig } from './test-utils/setup';
import {
  SponsoredProductsCreateOrUpdateEntityState,
  SponsoredProductsCreateCampaignNegativeTargetingClause,
  SponsoredProductsUpdateCampaignNegativeTargetingClause,
  SponsoredProductsCreateOrUpdateNegativeTargetingExpressionPredicateType,
} from '../../../generated/sponsored-products';

describe('CampaignNegativeTargetingModule', () => {
  let testConfig: TestConfig;
  let createdTargetId: string;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  describe('CRUD Operations', () => {
    it('should create campaign negative targeting clauses', async () => {
      const negativeTargetingClause: SponsoredProductsCreateCampaignNegativeTargetingClause = {
        campaignId: testConfig.campaignId,
        state: SponsoredProductsCreateOrUpdateEntityState.Enabled,
        expression: [
          {
            type: SponsoredProductsCreateOrUpdateNegativeTargetingExpressionPredicateType.AsinBrandSameAs,
            value: '3138220031',
          },
        ],
      };

      const response = await testConfig.sdk.targeting.negative.campaign
        .create(testConfig.profileId, {
          campaignNegativeTargetingClauses: [negativeTargetingClause],
        })
        .catch(error => {
          debugger;
          throw error;
        });

      expect(response.data).toBeDefined();
      expect(response.data.campaignNegativeTargetingClauses).toBeDefined();

      const target = response.data.campaignNegativeTargetingClauses.success?.[0];
      if (target?.campaignNegativeTargetingClauseId) {
        createdTargetId = target.campaignNegativeTargetingClauseId;
      } else {
        throw new Error('Target ID not found');
      }
    }, 30000);

    it('should list campaign negative targeting clauses', async () => {
      const response = await testConfig.sdk.targeting.negative.campaign.list(testConfig.profileId).catch(error => {
        debugger;
        throw error;
      });

      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.campaignNegativeTargetingClauses)).toBe(true);
    }, 30000);

    it('should update campaign negative targeting clauses', async () => {
      const updateClause: SponsoredProductsUpdateCampaignNegativeTargetingClause = {
        targetId: createdTargetId,
        state: SponsoredProductsCreateOrUpdateEntityState.Paused,
      };

      const response = await testConfig.sdk.targeting.negative.campaign
        .update(testConfig.profileId, {
          campaignNegativeTargetingClauses: [updateClause],
        })
        .catch(error => {
          debugger;
          throw error;
        });

      expect(response.data).toBeDefined();
      expect(response.data.campaignNegativeTargetingClauses).toBeDefined();
    }, 30000);

    it('should delete campaign negative targeting clauses', async () => {
      const response = await testConfig.sdk.targeting.negative.campaign
        .delete(testConfig.profileId, {
          campaignNegativeTargetIdFilter: {
            include: [createdTargetId],
          },
        })
        .catch(error => {
          debugger;
          throw error;
        });

      expect(response.data).toBeDefined();
      expect(response.status).toBe(200);
    }, 30000);
  });
});
