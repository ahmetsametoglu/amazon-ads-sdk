import { Configuration } from "../generated/sponsored-products";
import axios, { AxiosInstance } from "axios";

export interface BaseConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  region: "NA" | "EU" | "FE";
  sandbox?: boolean;
}

export abstract class BaseApi {
  protected axiosInstance: AxiosInstance;
  protected configuration: Configuration;

  constructor(protected config: BaseConfig) {
    this.axiosInstance = axios.create({
      baseURL: this.getBaseUrl(),
      headers: {
        "Content-Type": "application/json",
        "Amazon-Advertising-API-ClientId": config.clientId,
      },
    });

    this.configuration = new Configuration({
      basePath: this.getBaseUrl(),
      accessToken: this.getAccessToken.bind(this),
    });
  }

  protected getBaseUrl(): string {
    const environment = this.config.sandbox ? "sandbox" : "production";
    const endpoints = {
      NA: "https://advertising-api.amazon.com",
      EU: "https://advertising-api-eu.amazon.com",
      FE: "https://advertising-api-fe.amazon.com",
    };

    return environment === "sandbox"
      ? endpoints[this.config.region].replace(
          "advertising-api",
          "advertising-api-test"
        )
      : endpoints[this.config.region];
  }

  private getTokenEndpoint(): string {
    const endpoints = {
      NA: "https://api.amazon.com/auth/o2/token",
      EU: "https://api.amazon.co.uk/auth/o2/token",
      FE: "https://api.amazon.co.jp/auth/o2/token",
    };
    return endpoints[this.config.region];
  }

  protected async getAccessToken(): Promise<string> {
    try {
      const tokenEndpoint = this.getTokenEndpoint();

      const response = await axios.post(
        tokenEndpoint,
        {
          grant_type: "refresh_token",
          refresh_token: this.config.refreshToken,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error("Access token alınırken hata oluştu:", error);
      throw new Error("Access token alınamadı");
    }
  }

  protected get clientId(): string {
    return this.config.clientId;
  }
}

