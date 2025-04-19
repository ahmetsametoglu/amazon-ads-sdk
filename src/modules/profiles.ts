import { BaseConfig } from './base';
import { BaseApi } from './base';
import { RawAxiosRequestConfig } from 'axios';

// API Response Tipleri
export interface Profile {
  profileId: number;
  countryCode: string;
  currencyCode: string;
  dailyBudget?: number;
  timezone: string;
  accountInfo: {
    marketplaceStringId: string;
    id: string;
    type: 'vendor' | 'seller' | 'agency';
    name: string;
    subType?: 'KDP_AUTHOR' | 'AMAZON_ATTRIBUTION';
    validPaymentMethod?: boolean;
  };
}

export interface ProfileResponse {
  profileId: number;
  code: string;
  details: string;
}

export interface ListProfilesParams {
  apiProgram?: 'billing' | 'campaign' | 'paymentMethod' | 'store' | 'report' | 'account' | 'posts';
  accessLevel?: 'edit' | 'view';
  profileTypeFilter?: 'seller' | 'vendor' | 'agency';
  validPaymentMethodFilter?: 'true' | 'false';
}

export class ProfilesModule extends BaseApi {
  constructor(config: BaseConfig) {
    super(config);

    // Content-Type'ı profiles modülü için ayarla
    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/json';
      return config;
    });
  }

  /**
   * Profilleri listeler
   * @param params Liste parametreleri
   * @param options Axios request seçenekleri
   * @returns Profile listesi
   */
  async list(params?: ListProfilesParams, options?: RawAxiosRequestConfig): Promise<Profile[]> {
    const response = await this.axiosInstance.get('/v2/profiles', {
      ...options,
      headers: {
        ...options?.headers,
        'Amazon-Advertising-API-ClientId': this.clientId,
      },
      params,
    });
    return response.data;
  }

  /**
   * Belirli bir profili ID'ye göre getirir
   * @param profileId Profil ID
   * @param options Axios request seçenekleri
   * @returns Profile detayları
   */
  async getById(profileId: number, options?: RawAxiosRequestConfig): Promise<Profile> {
    const response = await this.axiosInstance.get(`/v2/profiles/${profileId}`, {
      ...options,
      headers: {
        ...options?.headers,
        'Amazon-Advertising-API-ClientId': this.clientId,
      },
    });
    return response.data;
  }

  /**
   * Profilleri günceller (Sadece Sponsored Products için Seller hesaplarında çalışır)
   * @param profiles Güncellenecek profiller
   * @param options Axios request seçenekleri
   * @returns Güncelleme sonuçları
   */
  async update(profiles: Partial<Profile>[], options?: RawAxiosRequestConfig): Promise<ProfileResponse[]> {
    const response = await this.axiosInstance.put('/v2/profiles', profiles, {
      ...options,
      headers: {
        ...options?.headers,
        'Amazon-Advertising-API-ClientId': this.clientId,
      },
    });
    return response.data;
  }
}
