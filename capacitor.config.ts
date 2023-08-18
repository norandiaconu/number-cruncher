import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.norandiaconu.numbercruncher",
  appName: "Number Cruncher",
  webDir: "docs",
  server: {
    androidScheme: "https",
  },
  backgroundColor: "#000000",
};

export default config;
