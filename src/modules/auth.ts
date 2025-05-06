import axios from 'axios';
import { BaseApi, AuthConfig } from './base';

export class AuthModule extends BaseApi {
  constructor(config: AuthConfig) {
    super({ ...config, refreshToken: '' });
  }

  public getAuthorizationUrl(redirectUri: string, state: string = ''): string {
    const baseUrls = {
      NA: 'https://www.amazon.com/ap/oa',
      EU: 'https://eu.account.amazon.com/ap/oa',
      FE: 'https://apac.account.amazon.com/ap/oa',
    };

    const params: Record<string, string> = {
      client_id: this.config.clientId,
      scope: 'advertising::campaign_management',
      response_type: 'code',
      redirect_uri: redirectUri,
    };

    if (state) {
      params.state = state;
    }

    const queryParams = new URLSearchParams(params);

    return `${baseUrls[this.config.region]}?${queryParams.toString()}`;
  }

  public async getRefreshToken(authorizationCode: string, redirectUri: string): Promise<{ refreshToken: string }> {
    const tokenEndpoint = this.getTokenEndpoint();

    const response = await axios
      .post(
        tokenEndpoint,
        {
          grant_type: 'authorization_code',
          code: authorizationCode,
          redirect_uri: redirectUri,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .catch(err => {
        debugger;
        throw err;
      });

    if (!response.data.refresh_token) {
      throw new Error('Refresh token not received');
    }

    return {
      refreshToken: response.data.refresh_token,
    };
  }
}
