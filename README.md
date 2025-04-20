# Amazon Ads SDK

Amazon Advertising API için TypeScript/JavaScript SDK'sı.

## Kurulum

```bash
npm install @ayas/amazon-ads-sdk
```

veya

```bash
yarn add @ayas/amazon-ads-sdk
```

## Kullanım

```typescript
import { AmazonAdsSDK } from '@ayas/amazon-ads-sdk';

const sdk = new AmazonAdsSDK({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  refreshToken: 'your-refresh-token',
  region: 'EU',
  sandbox: false,
});

// Sponsored Products API'si
const campaigns = await sdk.sponsoredProducts.campaigns.list();
const adGroups = await sdk.sponsoredProducts.adGroups.list();

// Targeting API'si
const targeting = await sdk.targeting.targeting.list();
const negativeTargeting = await sdk.targeting.negativeTargeting.list();
```

## Çevre Değişkenleri

`.env` dosyası oluşturarak aşağıdaki değişkenleri tanımlayabilirsiniz:

```env
AMAZON_CLIENT_ID=your-client-id
AMAZON_CLIENT_SECRET=your-client-secret
AMAZON_REFRESH_TOKEN=your-refresh-token
AMAZON_REGION=EU
SANDBOX_MODE=false
```

## Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme için derleme
npm run build

# Testleri çalıştır
npm test

# Lint kontrolü
npm run lint
```

## Lisans

MIT
