import { AmazonAdsSDK } from '../../../../index';
import { SP } from '../../../../namespaces/sp';
import { BaseConfig } from '../../../../modules/base';
import dotenv from 'dotenv';

dotenv.config();

export interface TestConfig {
  profileId: string;
  campaignId: string;
  adGroupId: string;
  sdk: SP.API;
}

let testConfig: TestConfig | null = null;

export async function getTestConfig(): Promise<TestConfig> {
  if (testConfig) {
    return testConfig;
  }

  const requiredEnvVars = ['AMAZON_CLIENT_ID', 'AMAZON_CLIENT_SECRET', 'AMAZON_REFRESH_TOKEN'];
  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      throw new Error(`${envVar} environment variable is not defined`);
    }
  });

  const config: BaseConfig = {
    clientId: process.env.AMAZON_CLIENT_ID!,
    clientSecret: process.env.AMAZON_CLIENT_SECRET!,
    refreshToken: process.env.AMAZON_REFRESH_TOKEN!,
    region: 'EU',
  };

  const amazonAds = new AmazonAdsSDK(config);
  const sdk = new SP.API(config);

  // Find France profile
  const profiles = await amazonAds.profiles
    .list()
    .then(profiles => profiles.filter(x => x.countryCode === 'FR'))
    .catch(err => {
      debugger;
      throw err;
    });
  if (profiles.length === 0) {
    throw new Error('No France profile found for testing');
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
    throw new Error('No test campaign found');
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
    throw new Error('No test ad group found');
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
