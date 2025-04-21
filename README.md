# Amazon Ads SDK

TypeScript/JavaScript SDK for Amazon Advertising API.

> ⚠️ **Important Notice**
> 
> This SDK is primarily developed for internal use in our company's applications. As such:
> - The API structure may undergo significant changes without prior notice
> - Breaking changes are likely to occur frequently
> - Features may be added or removed based on our internal needs
> 
> **Recommendation**: If you want to use this SDK in your project, we strongly recommend:
> 1. Fork the repository
> 2. Create your own package under your organization's name
> 3. Maintain your own version based on your specific requirements
> 
> This approach will give you full control over the SDK's development and protect you from unexpected breaking changes.

## Installation

```bash
npm install @ayasdev/amazon-ads-sdk
```

or

```bash
yarn add @ayasdev/amazon-ads-sdk
```

## Usage

```typescript
import { AmazonAdsSDK } from 'amazon-ads-sdk-ayas';

const sdk = new AmazonAdsSDK({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  refreshToken: 'your-refresh-token',
  region: 'EU',
  sandbox: false,
});

// Sponsored Products API
const campaigns = await sdk.sponsoredProducts.campaigns.list();
const adGroups = await sdk.sponsoredProducts.adGroups.list();

// Targeting API
const targeting = await sdk.targeting.targeting.list();
const negativeTargeting = await sdk.targeting.negativeTargeting.list();
```

## Environment Variables

You can define the following variables in your `.env` file:

```env
AMAZON_CLIENT_ID=your-client-id
AMAZON_CLIENT_SECRET=your-client-secret
AMAZON_REFRESH_TOKEN=your-refresh-token
AMAZON_REGION=EU
SANDBOX_MODE=false
```

## Development

```bash
# Install dependencies
npm install

# Build for development
npm run build

# Run tests
npm test

# Run linting
npm run lint
```

## Features

- Full TypeScript support
- Modular architecture with namespaces
- Complete Sponsored Products API coverage
- Comprehensive targeting options
- Environment variables support
- Built-in sandbox mode

## API Structure

### Sponsored Products

- Campaigns
- Ad Groups
- Product Ads
- Keywords
- Negative Keywords
- Campaign Negative Keywords
- Keyword Recommendations
- Campaign Optimization Rules

### Targeting

- Targeting
- Negative Targeting
- Campaign Negative Targeting
- Product Targeting
- Target Promotion Groups

## Error Handling

The SDK uses a consistent error handling approach:

```typescript
try {
  const campaigns = await sdk.sponsoredProducts.campaigns.list();
} catch (error) {
  if (error.response) {
    // Amazon API error
    console.error('API Error:', error.response.data);
  } else {
    // Network or other error
    console.error('Error:', error.message);
  }
}
```

## Authentication

The SDK supports authentication through environment variables or direct configuration:

```typescript
// Using environment variables
const sdk = new AmazonAdsSDK();

// Direct configuration
const sdk = new AmazonAdsSDK({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  refreshToken: 'your-refresh-token',
  region: 'EU',
  sandbox: false,
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers directly.
