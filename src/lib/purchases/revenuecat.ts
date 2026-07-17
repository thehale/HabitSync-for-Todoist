import Purchases, { PRODUCT_CATEGORY } from "react-native-purchases";

export namespace RevenueCat {
  export namespace Product {
    export type Identifier = string;
  }
  export namespace Entitlement {
    export type Identifier = string;
  }
}

export async function priceOf(identifier: RevenueCat.Product.Identifier) {
  const products = await Purchases.getProducts([identifier], PRODUCT_CATEGORY.NON_SUBSCRIPTION);
  const product = products[0];
  return product?.priceString;
}

export async function purchase(identifier: RevenueCat.Product.Identifier) {
  const products = await Purchases.getProducts([identifier], PRODUCT_CATEGORY.NON_SUBSCRIPTION);
  const product = products[0];
  if (product) {
    await Purchases.purchaseStoreProduct(product);
  }
}

export async function isEntitledTo(identifier: RevenueCat.Entitlement.Identifier) {
  const customerInfo = await Purchases.getCustomerInfo();
  return typeof customerInfo.entitlements.active[identifier] !== "undefined";
}

export async function restorePurchases() {
  await Purchases.restorePurchases();
}
