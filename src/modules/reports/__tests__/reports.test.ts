import { AmazonAdsSDK } from '../../../index';
import dotenv from 'dotenv';
import { AsyncReportAdProduct, AsyncReportConfigurationFormatEnum, AsyncReportConfigurationTimeUnitEnum } from '../../../generated/reports/api';

dotenv.config();

const columns = [
  'date',
  'portfolioId',
  'campaignName',
  'campaignId',
  'adGroupName',
  'adGroupId',
  'keywordId',
  'keyword',
  'keywordType',
  'advertisedAsin',
  'purchasedAsin',
  'advertisedSku',
  'campaignBudgetCurrencyCode',
  'matchType',
  'unitsSoldClicks1d',
  'unitsSoldClicks7d',
  'unitsSoldClicks14d',
  'unitsSoldClicks30d',
  'sales1d',
  'sales7d',
  'sales14d',
  'sales30d',
  'purchases1d',
  'purchases7d',
  'purchases14d',
  'purchases30d',
  'unitsSoldOtherSku1d',
  'unitsSoldOtherSku7d',
  'unitsSoldOtherSku14d',
  'unitsSoldOtherSku30d',
  'salesOtherSku1d',
  'salesOtherSku7d',
  'salesOtherSku14d',
  'salesOtherSku30d',
  'purchasesOtherSku1d',
  'purchasesOtherSku7d',
  'purchasesOtherSku14d',
  'purchasesOtherSku30d',
  'kindleEditionNormalizedPagesRead14d',
  'kindleEditionNormalizedPagesRoyalties14d',
];

describe('ReportsModule Integration Tests', () => {
  let sdk: AmazonAdsSDK;
  const clientId = process.env.AMAZON_CLIENT_ID || '';
  const clientSecret = process.env.AMAZON_CLIENT_SECRET || '';
  const refreshToken = process.env.AMAZON_REFRESH_TOKEN || '';
  const region = (process.env.AMAZON_REGION as 'NA' | 'EU' | 'FE') || 'EU';

  beforeAll(() => {
    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error('Missing required environment variables: AMAZON_CLIENT_ID, AMAZON_CLIENT_SECRET, AMAZON_REFRESH_TOKEN');
    }
    sdk = new AmazonAdsSDK({ clientId, clientSecret, refreshToken, region });
  });

  let createdReportId: string | undefined = '78fb9253-a5d3-4ced-a930-eacd87bb092f';
  const profileId = '1357743012711707';
  it('should create a report', async () => {
    const result = await sdk.reports
      .createReport(
        {
          startDate: '2025-04-01',
          endDate: '2025-05-01',
          configuration: {
            columns,
            reportTypeId: 'spPurchasedProduct',
            groupBy: ['asin'],
            adProduct: AsyncReportAdProduct.SponsoredProducts,
            format: AsyncReportConfigurationFormatEnum.GzipJson,
            timeUnit: AsyncReportConfigurationTimeUnitEnum.Daily,
          },
          name: 'TestReport',
        },
        profileId
      )
      .catch(err => {
        debugger;
        throw err;
      });
    expect(result).toHaveProperty('reportId');
    createdReportId = result.reportId;
  }, 20000);

  it('should get the status of the created report', async () => {
    if (!createdReportId) return;
    const status = await sdk.reports.getReportStatus(createdReportId, { scope: profileId, getDataIfCompleted: true }).catch(err => {
      debugger;
      throw err;
    });
    console.log(status);
    expect(status).toHaveProperty('status');
    expect(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']).toContain(status.status);
  }, 10000);

  it('should delete the report', async () => {
    if (!createdReportId) return;
    const result = await sdk.reports.deleteReport(createdReportId);
    expect(result).toHaveProperty('reportId', createdReportId);
  }, 10000);
});
