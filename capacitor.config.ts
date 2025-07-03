
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8110f9986f034316baa188fa7b44d941',
  appName: 'goal-getters-glance',
  webDir: 'dist',
  server: {
    url: 'https://8110f998-6f03-4316-baa1-88fa7b44d941.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-2724188999443747~1234567890', // Replace with your actual app ID
      initializeForTesting: true
    }
  }
};

export default config;
