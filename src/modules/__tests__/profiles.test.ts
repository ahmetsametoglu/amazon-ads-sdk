import { AmazonAdsSDK } from "../../index";
import dotenv from "dotenv";

// Test environment'ı yükle
dotenv.config();

describe("ProfilesModule Integration Tests", () => {
  let sdk: AmazonAdsSDK;

  beforeAll(() => {
    // Test için gerekli environment variables'ların varlığını kontrol et
    const requiredEnvVars = [
      "AMAZON_CLIENT_ID",
      "AMAZON_CLIENT_SECRET",
      "AMAZON_REFRESH_TOKEN",
    ];

    const missingEnvVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar]
    );

    if (missingEnvVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingEnvVars.join(", ")}`
      );
    }

    // SDK instance'ını oluştur
    sdk = new AmazonAdsSDK();
  });

  describe("list", () => {
    it("profilleri başarıyla listeler", async () => {
      const profiles = await sdk.profiles.list({}).catch((err) => {
        throw err;
      });

      // Response kontrolü
      expect(Array.isArray(profiles)).toBe(true);
      if (profiles.length > 0) {
        const profile = profiles[0];
        expect(profile).toHaveProperty("profileId");
        expect(profile).toHaveProperty("countryCode");
        expect(profile).toHaveProperty("currencyCode");
        expect(profile).toHaveProperty("timezone");
        expect(profile).toHaveProperty("accountInfo");
        expect(profile.accountInfo).toHaveProperty("marketplaceStringId");
        expect(profile.accountInfo).toHaveProperty("id");
        expect(profile.accountInfo).toHaveProperty("type");
        expect(profile.accountInfo).toHaveProperty("name");
      }
    }, 10000); // Timeout 10 saniye
  });

  describe("getById", () => {
    let testProfileId: number;

    beforeAll(async () => {
      // Test için kullanılacak profil ID'sini al
      const profiles = await sdk.profiles.list();
      if (profiles.length === 0) {
        throw new Error("No profiles found for testing");
      }
      testProfileId = profiles[0].profileId;
    });

    it("profili ID ile başarıyla getirir", async () => {
      const profile = await sdk.profiles.getById(testProfileId);

      // Response kontrolü
      expect(profile).toBeDefined();
      expect(profile.profileId).toBe(testProfileId);
      expect(profile).toHaveProperty("countryCode");
      expect(profile).toHaveProperty("currencyCode");
      expect(profile).toHaveProperty("timezone");
      expect(profile).toHaveProperty("accountInfo");
    }, 10000);

    it("geçersiz ID için hata döner", async () => {
      const invalidProfileId = 999999999;

      await expect(sdk.profiles.getById(invalidProfileId)).rejects.toThrow();
    }, 10000);
  });

  describe("update", () => {
    let testProfileId: number;
    let originalDailyBudget: number;
    let originalAccountInfo: any;
    beforeAll(async () => {
      // Test için kullanılacak profil ID'sini al
      const profiles = await sdk.profiles.list();
      if (profiles.length === 0) {
        throw new Error("No profiles found for testing");
      }
      testProfileId = profiles[0].profileId;
      originalDailyBudget = profiles[0].dailyBudget || 0;
      originalAccountInfo = profiles[0].accountInfo;
    });

    it("profil bütçesini başarıyla günceller", async () => {
      const newDailyBudget = originalDailyBudget + 10;

      const updateData = [
        {
          profileId: testProfileId,
          dailyBudget: newDailyBudget,
          accountInfo: {
            name: "test",
            ...originalAccountInfo,
          },
        },
      ];

      const result = await sdk.profiles.update(updateData).catch((err) => {
        throw err;
      });

      // Response kontrolü
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("profileId", testProfileId);
      expect(result[0]).toHaveProperty("code");

      // Değişikliği geri al
      await sdk.profiles.update([
        {
          profileId: testProfileId,
          dailyBudget: originalDailyBudget,
          accountInfo: {
            name: originalAccountInfo.name,
            ...originalAccountInfo,
          },
        },
      ]);
    }, 15000);
  });
});
