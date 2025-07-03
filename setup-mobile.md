
# Mobile App Setup Instructions

## Initial Setup (Run once)

1. **Initialize Capacitor project:**
   ```bash
   npx cap init
   ```

2. **Add mobile platforms:**
   ```bash
   npx cap add ios
   npx cap add android
   ```

## Development Workflow

1. **Build the web app:**
   ```bash
   npm run build
   ```

2. **Sync with native platforms:**
   ```bash
   npx cap sync
   ```

3. **Run on device/emulator:**
   ```bash
   # For Android
   npx cap run android
   
   # For iOS (Mac only)
   npx cap run ios
   ```

## AdMob Configuration

1. **Replace the app ID in `capacitor.config.ts`** with your actual AdMob app ID
2. **Update `initializeForTesting`** to `false` for production
3. **Configure proper ad unit IDs** for production

## Testing

- Web: AdMob shows as mockup for development
- Mobile: Native AdMob banners will display at the bottom of the screen

## Production Deployment

1. Set `initializeForTesting: false` in capacitor.config.ts
2. Use production ad unit IDs
3. Build and test on physical devices
4. Submit to app stores following their guidelines
