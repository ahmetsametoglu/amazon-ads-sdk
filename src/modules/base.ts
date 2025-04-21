import { Configuration } from '../generated/sponsored-products';
import axios, { AxiosInstance } from 'axios';

export interface BaseConfig {
  clientId: string;
  clientSecret: string;
  region: 'NA' | 'EU' | 'FE';
  sandbox?: boolean;
  refreshToken?: string;
  redirectUri?: string;
}

export interface AuthConfig {
  clientId: string;
  clientSecret: string;
  region: 'NA' | 'EU' | 'FE';
  redirectUri: string;
}

interface TokenInfo {
  accessToken: string;
  expiresAt: number;
}

export abstract class BaseApi {
  protected axiosInstance: AxiosInstance;
  protected configuration: Configuration;
  private tokenInfo: TokenInfo | null = null;

  constructor(protected config: BaseConfig) {
    this.axiosInstance = axios.create({
      baseURL: this.getBaseUrl(),
      headers: {
        'Amazon-Advertising-API-ClientId': config.clientId,
      },
    });

    this.configuration = new Configuration({
      basePath: this.getBaseUrl(),
      accessToken: this.getAccessToken.bind(this),
    });

    this.axiosInstance.interceptors.request.use(async config => {
      const token = await this.getValidAccessToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  protected getBaseUrl(): string {
    const environment = this.config.sandbox ? 'sandbox' : 'production';
    const endpoints = {
      NA: 'https://advertising-api.amazon.com',
      EU: 'https://advertising-api-eu.amazon.com',
      FE: 'https://advertising-api-fe.amazon.com',
    };

    return environment === 'sandbox'
      ? endpoints[this.config.region].replace('advertising-api', 'advertising-api-test')
      : endpoints[this.config.region];
  }

  protected getTokenEndpoint(): string {
    const endpoints = {
      NA: 'https://api.amazon.com/auth/o2/token',
      EU: 'https://api.amazon.co.uk/auth/o2/token',
      FE: 'https://api.amazon.co.jp/auth/o2/token',
    };
    return endpoints[this.config.region];
  }

  protected async getAccessToken() {
    try {
      const tokenEndpoint = this.getTokenEndpoint();

      const response = await axios.post(
        tokenEndpoint,
        {
          grant_type: 'refresh_token',
          refresh_token: this.config.refreshToken,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Access token alınırken hata oluştu:', error);
      throw new Error('Access token alınamadı');
    }
  }

  protected get clientId(): string {
    return this.config.clientId;
  }

  protected async getValidAccessToken(): Promise<string> {
    if (!this.tokenInfo || Date.now() >= this.tokenInfo.expiresAt) {
      return this.refreshAccessToken();
    }
    return this.tokenInfo.accessToken;
  }

  private async refreshAccessToken(): Promise<string> {
    const response = await this.getAccessToken();

    this.tokenInfo = {
      accessToken: response.access_token,
      expiresAt: Date.now() + (response.expires_in || 3600) * 1000,
    };

    return this.tokenInfo.accessToken;
  }
}
