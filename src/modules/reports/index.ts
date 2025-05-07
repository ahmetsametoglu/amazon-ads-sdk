import { BaseApi, BaseConfig } from '../base';
import { AsynchronousReportsApi } from '../../generated/reports';
import { CreateReportBody } from './report.model';
import axios from 'axios';
import * as zlib from 'zlib';

export class ReportsModule extends BaseApi {
  private api: AsynchronousReportsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.api = new AsynchronousReportsApi(this.configuration, undefined, this.axiosInstance);
    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.createasyncreportresponse.v3+json';
      config.headers['Accept'] = 'application/vnd.createasyncreportresponse.v3+json';
      return config;
    });
  }

  /**
   * Creates a report
   */
  async createReport(body: CreateReportBody, scope?: string, accountId?: string) {
    const response = await this.api.createAsyncReport(this.clientId, scope, accountId, body);
    return response.data;
  }

  /**
   * Gets the status of a report
   */
  async getReportStatus(reportId: string, clientId: string, params: { scope?: string; accountId?: string; getDataIfCompleted?: boolean }) {
    const response = await this.api.getAsyncReport(reportId, clientId, params.scope, params.accountId);
    let data = null;
    if (params.getDataIfCompleted && response.data.status === 'COMPLETED') {
      const downloadUrl = response.data.url;

      if (downloadUrl) {
        try {
          // Gzip dosyası olduğu için responseType: 'arraybuffer' kullanıyoruz
          const response = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
          // Gzip decompress
          const decompressed = zlib.gunzipSync(Buffer.from(response.data));
          // JSON parse
          const jsonData = JSON.parse(decompressed.toString('utf-8'));
          data = jsonData;
        } catch (err) {
          data = null;
        }
      }
    }
    return { ...response.data, data };
  }

  /**
   * Deletes a report
   */
  async deleteReport(reportId: string, clientId: string, scope?: string, accountId?: string) {
    const response = await this.api.deleteAsyncReport(reportId, clientId, scope, accountId);
    return response.data;
  }
}
