import { BaseApi, AuthConfig } from './base';

export class AuthModule extends BaseApi {
  constructor(config: AuthConfig) {
    super({ ...config, refreshToken: '' });
  }

  public getAuthorizationUrl(state: string = ''): string {
    const baseUrls = {
      NA: 'https://sellercentral.amazon.com',
      EU: 'https://sellercentral-europe.amazon.com',
      FE: 'https://sellercentral-japan.amazon.com',
    };

    const params: Record<string, string> = {
      client_id: this.config.clientId,
      scope: 'advertising::campaign_management',
      response_type: 'code',
      redirect_uri: this.config.redirectUri || '',
    };

    if (state) {
      params.state = state;
    }

    const queryParams = new URLSearchParams(params);

    return `${baseUrls[this.config.region]}/apps/authorize?${queryParams.toString()}`;
  }

  public async getRefreshToken(authorizationCode: string): Promise<{ refreshToken: string }> {
    const tokenEndpoint = this.getTokenEndpoint();

    const response = await this.axiosInstance.post(
      tokenEndpoint,
      {
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: this.config.redirectUri,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!response.data.refresh_token) {
      throw new Error('Refresh token not received');
    }

    return {
      refreshToken: response.data.refresh_token,
    };
  }
}
