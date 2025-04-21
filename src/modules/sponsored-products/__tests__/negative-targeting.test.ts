import { getTestConfig, TestConfig } from './test-utils/setup';
import {
  SponsoredProductsCreateOrUpdateEntityState,
  SponsoredProductsCreateNegativeTargetingClause,
  SponsoredProductsUpdateNegativeTargetingClause,
} from '../../../generated/sponsored-products';

describe('NegativeTargetingModule', () => {
  let testConfig: TestConfig;
  let createdTargetId: string;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  describe('CRUD Operations', () => {
    it('should create negative targeting clauses', async () => {
      const negativeTargetingClause: SponsoredProductsCreateNegativeTargetingClause = {
        adGroupId: testConfig.adGroupId,
        campaignId: testConfig.campaignId,
        state: SponsoredProductsCreateOrUpdateEntityState.Enabled,
        expression: [
          {
            type: 'ASIN_SAME_AS',
            value: '3138220031',
          },
        ],
      };

      const response = await testConfig.sdk.targeting.negative
        .create(testConfig.profileId, {
          negativeTargetingClauses: [negativeTargetingClause],
        })
        .catch(error => {
          debugger;
          throw error;
        });

      expect(response.data).toBeDefined();
      expect(response.data.negativeTargetingClauses).toBeDefined();

      const target = response.data.negativeTargetingClauses.success?.[0];
      if (target?.targetId) {
        createdTargetId = target.targetId;
      } else {
        throw new Error('Target ID not found');
      }
    }, 30000);

    it('should list negative targeting clauses', async () => {
      const response = await testConfig.sdk.targeting.negative.list(testConfig.profileId).catch(error => {
        debugger;
        throw error;
      });

      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.negativeTargetingClauses)).toBe(true);
    }, 30000);

    it('should update negative targeting clauses', async () => {
      const updateClause: SponsoredProductsUpdateNegativeTargetingClause = {
        targetId: createdTargetId,
        state: SponsoredProductsCreateOrUpdateEntityState.Paused,
      };

      const response = await testConfig.sdk.targeting.negative
        .update(testConfig.profileId, {
          negativeTargetingClauses: [updateClause],
        })
        .catch(error => {
          debugger;
          throw error;
        });

      expect(response.data).toBeDefined();
      expect(response.data.negativeTargetingClauses).toBeDefined();
    }, 30000);

    it('should delete negative targeting clauses', async () => {
      const response = await testConfig.sdk.targeting.negative
        .delete(testConfig.profileId, {
          negativeTargetIdFilter: {
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
