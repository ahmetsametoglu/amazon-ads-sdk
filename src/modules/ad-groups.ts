import { AdGroupsApi } from '../generated/sponsored-products/api';
import { BaseApi, BaseConfig } from './base';
import {
  SponsoredProductsCreateSponsoredProductsAdGroupsRequestContent as CreateAdGroupRequestContent,
  SponsoredProductsDeleteSponsoredProductsAdGroupsRequestContent as DeleteAdGroupRequestContent,
  SponsoredProductsListSponsoredProductsAdGroupsRequestContent as ListAdGroupsRequestContent,
  SponsoredProductsUpdateSponsoredProductsAdGroupsRequestContent as UpdateAdGroupRequestContent,
} from '../generated/sponsored-products';
import { RawAxiosRequestConfig } from 'axios';

export class AdGroupsModule extends BaseApi {
  private adGroupsApi: AdGroupsApi;

  constructor(config: BaseConfig) {
    super(config);
    this.adGroupsApi = new AdGroupsApi(this.configuration, undefined, this.axiosInstance);

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/vnd.spAdGroup.v3+json';
      config.headers['Accept'] = 'application/vnd.spAdGroup.v3+json';
      return config;
    });
  }

  async list(profileId: string, content?: ListAdGroupsRequestContent, options?: RawAxiosRequestConfig) {
    return this.adGroupsApi.listSponsoredProductsAdGroups(this.clientId, profileId, content, options);
  }

  async create(profileId: string, content: CreateAdGroupRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.adGroupsApi.createSponsoredProductsAdGroups(this.clientId, profileId, content, prefer, options);
  }

  async update(profileId: string, content: UpdateAdGroupRequestContent, prefer?: string, options?: RawAxiosRequestConfig) {
    return this.adGroupsApi.updateSponsoredProductsAdGroups(this.clientId, profileId, content, prefer, options);
  }

  async delete(profileId: string, content: DeleteAdGroupRequestContent, options?: RawAxiosRequestConfig) {
    return this.adGroupsApi.deleteSponsoredProductsAdGroups(this.clientId, profileId, content, options);
  }
}
