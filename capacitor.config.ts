
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.387cfd2577a44c089017cc69c991a56e',
  appName: 'PocketGlow',
  webDir: 'dist',
  server: {
    url: 'https://387cfd25-77a4-4c08-9017-cc69c991a56e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    backgroundColor: "#FFFFFF"
  }
};

export default config;
