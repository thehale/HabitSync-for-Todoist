import { useCallback } from "react";
import { useAsyncState } from "../hooks/useAsyncState";
import { MaterialThemeDefinition } from "react-native-expressive";
import { PRODUCTS } from "./products";

export function useThemeProduct(theme: MaterialThemeDefinition) {
  const product = PRODUCTS[theme.name];
  
  const entitled = useAsyncState(false, async () => product.isEntitled(), [theme.name]);
  const price = useAsyncState<string | null>(null, async () => product.price(), [theme.name]);
  const purchase = useCallback(async () => { await product.purchase(); }, [theme.name]);

  return { entitled, price, purchase };
}
