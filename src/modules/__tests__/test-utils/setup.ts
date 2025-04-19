import { AmazonAdsSDK } from '../../..';
import dotenv from 'dotenv';

dotenv.config();

export interface TestConfig {
  profileId: string;
  campaignId: string;
  adGroupId: string;
  sdk: AmazonAdsSDK;
}

let testConfig: TestConfig | null = null;

export async function getTestConfig(): Promise<TestConfig> {
  if (testConfig) {
    return testConfig;
  }

  const requiredEnvVars = ['AMAZON_CLIENT_ID', 'AMAZON_CLIENT_SECRET', 'AMAZON_REFRESH_TOKEN'];
  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      throw new Error(`${envVar} ortam değişkeni tanımlanmamış`);
    }
  });

  const sdk = new AmazonAdsSDK();

  // Fransa profili bul
  const profiles = await sdk.profiles
    .list()
    .then(profiles => profiles.filter(x => x.countryCode === 'FR'))
    .catch(err => {
      debugger;
      throw err;
    });
  if (profiles.length === 0) {
    throw new Error('Test için Fransa profili bulunamadı');
  }
  const profileId = profiles[0].profileId.toString();

  const campaigns = await sdk.campaigns
    .list(profileId, {
      nameFilter: { include: ['TEST CAMPAIGN'], queryTermMatchType: 'EXACT_MATCH' },
    })
    .then(x => x.data.campaigns || [])
    .catch(err => {
      debugger;
      throw err;
    });

  if (campaigns.length === 0) {
    throw new Error('Test için kampanya bulunamadı');
  }

  const campaignId = campaigns[0].campaignId;

  const adGroups = await sdk.adGroups
    .list(profileId, {
      campaignIdFilter: { include: [campaignId] },
      nameFilter: { include: ['TEST AD GROUP'], queryTermMatchType: 'EXACT_MATCH' },
    })
    .then(x => x.data.adGroups || [])
    .catch(err => {
      debugger;
      throw err;
    });

  if (adGroups.length === 0) {
    throw new Error('Test için ad grup bulunamadı');
  }
  const adGroupId = adGroups[0].adGroupId;

  testConfig = {
    profileId,
    campaignId,
    adGroupId,
    sdk,
  };

  return testConfig;
}
