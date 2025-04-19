import { ProductAdsApi } from '../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from './base';
import {
  SponsoredProductsCreateSponsoredProductsProductAdsRequestContent as CreateProductAdsRequestContent,
  SponsoredProductsDeleteSponsoredProductsProductAdsRequestContent as DeleteProductAdsRequestContent,
  SponsoredProductsListSponsoredProductsProductAdsRequestContent as ListProductAdsRequestContent,
  SponsoredProductsUpdateSponsoredProductsProductAdsRequestContent as UpdateProductAdsRequestContent,
} from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

export class ProductAdsModule extends BaseApi {
  private productAdsApi: ProductAdsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.productAdsApi = new ProductAdsApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spProductAd.v3+json';
      config.headers['Accept'] = 'application/vnd.spProductAd.v3+json';
      return config;
    });
  }

  async list(profileId: string, content?: ListProductAdsRequestContent, options?: RawAxiosRequestConfig) {
    return this.productAdsApi.listSponsoredProductsProductAds(this.clientId, profileId, content, options);
  }

  async create(profileId: string, content: CreateProductAdsRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.productAdsApi.createSponsoredProductsProductAds(this.clientId, profileId, content, prefer, options);
  }

  async update(profileId: string, content: UpdateProductAdsRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.productAdsApi.updateSponsoredProductsProductAds(this.clientId, profileId, content, prefer, options);
  }

  async delete(profileId: string, content: DeleteProductAdsRequestContent, options?: RawAxiosRequestConfig) {
    return this.productAdsApi.deleteSponsoredProductsProductAds(this.clientId, profileId, content, options);
  }
}
