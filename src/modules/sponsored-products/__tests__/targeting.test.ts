import { getTestConfig, TestConfig } from './test-utils/setup';
import {
  SponsoredProductsCreateTargetingClause,
  SponsoredProductsUpdateTargetingClause,
  SponsoredProductsCreateTargetingExpressionPredicateType,
  SponsoredProductsCreateOrUpdateEntityState,
  SponsoredProductsDeleteSponsoredProductsTargetingClausesRequestContent,
  SponsoredProductsObjectIdFilter,
} from '../../../generated/sponsored-products';

describe('TargetingModule', () => {
  let testConfig: TestConfig;

  beforeAll(async () => {
    testConfig = await getTestConfig();
  });

  it('should create targeting clauses', async () => {
    const request = {
      targetingClauses: [
        {
          campaignId: testConfig.campaignId,
          adGroupId: testConfig.adGroupId,
          state: SponsoredProductsCreateOrUpdateEntityState.Enabled,
          expression: [
            {
              type: SponsoredProductsCreateTargetingExpressionPredicateType.AsinSameAs,
              value: 'B0F54QP21F',
            },
          ],
          expressionType: 'MANUAL',
          bid: 1.0,
        } as SponsoredProductsCreateTargetingClause,
      ],
    };

    const response = await testConfig.sdk.targeting.create(testConfig.profileId, request);
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
  });

  it('should list targeting clauses', async () => {
    const response = await testConfig.sdk.targeting.list(testConfig.profileId);
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
  });

  it('should update targeting clauses', async () => {
    const request = {
      targetingClauses: [
        {
          targetId: '123456789',
          state: SponsoredProductsCreateOrUpdateEntityState.Paused,
          bid: 2.0,
        } as SponsoredProductsUpdateTargetingClause,
      ],
    };

    const response = await testConfig.sdk.targeting.update(testConfig.profileId, request);
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
  });

  it('should delete targeting clauses', async () => {
    const request: SponsoredProductsDeleteSponsoredProductsTargetingClausesRequestContent = {
      targetIdFilter: {
        include: ['123456789'],
      } as SponsoredProductsObjectIdFilter,
    };

    const response = await testConfig.sdk.targeting.delete(testConfig.profileId, request);
    expect(response).toBeDefined();
  });

  it('should create, update and delete targeting clauses', async () => {
    const createRequest = {
      targetingClauses: [
        {
          expression: [
            {
              type: SponsoredProductsCreateTargetingExpressionPredicateType.AsinCategorySameAs,
              value: '12345',
            },
          ],
          expressionType: 'MANUAL',
          state: SponsoredProductsCreateOrUpdateEntityState.Enabled,
          bid: 1.0,
          adGroupId: testConfig.adGroupId,
          campaignId: testConfig.campaignId,
        } as SponsoredProductsCreateTargetingClause,
      ],
    };

    const createResponse = await testConfig.sdk.targeting.create(testConfig.profileId, createRequest);
    expect(createResponse.data.targetingClauses.success).toBeDefined();
    expect(Array.isArray(createResponse.data.targetingClauses.success)).toBe(true);
    expect(createResponse.data.targetingClauses.success?.length).toBeGreaterThan(0);

    const targetingClause = createResponse.data.targetingClauses.success?.[0];
    if (!targetingClause) {
      throw new Error('Targeting clause not found');
    }
    const targetId = targetingClause.targetId;

    const updateRequest = {
      targetingClauses: [
        {
          targetId,
          state: SponsoredProductsCreateOrUpdateEntityState.Paused,
          bid: 2.0,
        } as SponsoredProductsUpdateTargetingClause,
      ],
    };

    const updateResponse = await testConfig.sdk.targeting.update(testConfig.profileId, updateRequest);
    expect(updateResponse.data.targetingClauses.success).toBeDefined();
    expect(Array.isArray(updateResponse.data.targetingClauses.success)).toBe(true);
    expect(updateResponse.data.targetingClauses.success?.length).toBeGreaterThan(0);

    const deleteRequest = {
      targetIdFilter: {
        include: [targetId],
      } as SponsoredProductsObjectIdFilter,
    };

    const deleteResponse = await testConfig.sdk.targeting.delete(testConfig.profileId, deleteRequest);
    expect(deleteResponse.data.targetingClauses.success).toBeDefined();
    expect(Array.isArray(deleteResponse.data.targetingClauses.success)).toBe(true);
    expect(deleteResponse.data.targetingClauses.success?.length).toBeGreaterThan(0);
  });
});
