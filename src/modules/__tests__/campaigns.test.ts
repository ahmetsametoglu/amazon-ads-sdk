import { AmazonAdsSDK, SponsoredProductsCreateCampaign, SponsoredProductsUpdateCampaign } from '../../index';
import dotenv from 'dotenv';

// Test environment'ı yükle
dotenv.config();

describe('CampaignsModule Integration Tests', () => {
  let sdk: AmazonAdsSDK;
  let testProfileId: string;

  beforeAll(async () => {
    // Test için gerekli environment variables'ların varlığını kontrol et
    const requiredEnvVars = ['AMAZON_CLIENT_ID', 'AMAZON_CLIENT_SECRET', 'AMAZON_REFRESH_TOKEN'];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    // SDK instance'ını oluştur
    sdk = new AmazonAdsSDK();

    // Test için kullanılacak profil ID'sini al
    const profiles = await sdk.profiles.list().then(profiles => profiles.filter(x => x.countryCode === 'FR'));
    if (profiles.length === 0) {
      throw new Error('No profiles found for testing');
    }
    testProfileId = profiles[0].profileId.toString();
  });

  describe('list', () => {
    it('kampanyaları başarıyla listeler', async () => {
      const campaigns = await sdk.campaigns
        .list(testProfileId, { stateFilter: { include: ['ENABLED'] } })
        .then(x => x.data.campaigns || [])
        .catch(err => {
          debugger;
          throw err;
        });

      // Response kontrolü
      expect(Array.isArray(campaigns)).toBe(true);
      if (campaigns.length > 0) {
        const campaign = campaigns[0];
        expect(campaign).toHaveProperty('campaignId');
        expect(campaign).toHaveProperty('name');
        expect(campaign).toHaveProperty('state');
        expect(campaign).toHaveProperty('budget');
        expect(campaign.budget).toHaveProperty('budgetType');
        expect(campaign.budget).toHaveProperty('budget');
      }
    }, 10000);
  });

  describe('create and update', () => {
    let testCampaignId: string;

    const campaignData = {
      name: 'Test Campaign ' + Date.now(),
      state: 'PAUSED',
      budget: { budgetType: 'DAILY', budget: 10 },
      startDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD formatı
      targetingType: 'MANUAL',
      dynamicBidding: { strategy: 'LEGACY_FOR_SALES' },
    } as SponsoredProductsCreateCampaign;

    it('yeni kampanya oluşturur', async () => {
      const response = await sdk.campaigns.create(testProfileId, { campaigns: [campaignData] }).catch(err => {
        debugger;
        throw err;
      });

      const data = response.data;

      // Response kontrolü
      expect(data).toBeDefined();
      expect(data.campaigns).toBeDefined();
      if (!data.campaigns?.success) throw new Error('Campaign creation failed');
      expect(data.campaigns.success.length).toBeGreaterThan(0);
      expect(data.campaigns.success[0]).toHaveProperty('campaignId');

      // Test için campaign ID'yi sakla
      const campaignId = data.campaigns.success[0].campaignId;
      if (!campaignId) throw new Error('Campaign ID not found');
      testCampaignId = campaignId;
    }, 15000);

    it('kampanyayı günceller', async () => {
      const updateData = {
        campaignId: testCampaignId.toString(),
        name: 'Updated Test Campaign ' + Date.now(),
        state: 'PAUSED',
        budget: { budgetType: 'DAILY', budget: 15 },
      } as SponsoredProductsUpdateCampaign;

      const response = await sdk.campaigns.update(testProfileId, { campaigns: [updateData] }).catch(err => {
        debugger;
        throw err;
      });

      const data = response.data;

      // Response kontrolü
      expect(data).toBeDefined();
      expect(data.campaigns).toBeDefined();
      if (!data.campaigns?.success) throw new Error('Campaign update failed');
      expect(data.campaigns.success.length).toBeGreaterThan(0);
      expect(data.campaigns.success[0].campaignId).toBe(testCampaignId);
    }, 15000);

    it('kampanyayı siler', async () => {
      const response = await sdk.campaigns
        .delete(testProfileId, {
          campaignIdFilter: { include: [testCampaignId] },
        })
        .catch(err => {
          debugger;
          throw err;
        });

      const data = response.data;

      // Response kontrolü
      expect(data).toBeDefined();
      expect(data.campaigns).toBeDefined();
      if (!data.campaigns?.success) throw new Error('Campaign deletion failed');
      expect(data.campaigns.success.length).toBeGreaterThan(0);
    }, 15000);
  });

  describe('error handling', () => {
    it('geçersiz profil ID ile hata döner', async () => {
      const invalidProfileId = '999999999';

      await expect(sdk.campaigns.list(invalidProfileId)).rejects.toThrow();
    }, 10000);

    it('geçersiz kampanya verisi ile hata döner', async () => {
      const invalidCampaignData = {
        // Zorunlu alanlar eksik
        name: 'Invalid Campaign',
      };

      await expect(
        sdk.campaigns.create(testProfileId, {
          campaigns: [invalidCampaignData as any],
        })
      ).rejects.toThrow();
    }, 10000);
  });
});
