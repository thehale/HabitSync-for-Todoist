import Purchases, { LOG_LEVEL } from "react-native-purchases";
import * as Config from "./config";

export function initPurchases() {
  Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  Purchases.configure({ apiKey: Config.REVENUECAT_API_KEY });
}
