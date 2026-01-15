import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pixeldoctor.app',
  appName: 'Pixel Doctor',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
