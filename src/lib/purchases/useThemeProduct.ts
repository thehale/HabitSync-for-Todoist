import { useCallback, useEffect, useState } from "react";
import { MaterialThemeDefinition } from "react-native-expressive";
import * as revenuecat from "./revenuecat";

export function useThemeProduct(theme: MaterialThemeDefinition) {
  const identifiers = IDENTIFIERS[theme.name];
  
  const [entitled, setEntitled] = useState(false);
  useEffect(() => {
    (async () => {
      const isEntitled = await revenuecat.isEntitledTo(identifiers.entitlement);
      setEntitled(isEntitled);
    })();
  }, [theme.name]);

  const [price, setPrice] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const price = await revenuecat.priceOf(identifiers.product);
      setPrice(price ?? null);
    })();
  }, [theme.name]);

  const purchase = useCallback(async () => {
    await revenuecat.purchase(identifiers.product);
  }, [theme.name]);

  return { entitled, price, purchase };
}

const IDENTIFIERS: Record<string, { entitlement: string; product: string }> = {
  "material/red": {
    entitlement: "theme.material.red",
    product: "dev.jhale.todoisthabitsync.theme.material.red",
  },
  "material/orange": {
    entitlement: "theme.material.orange",
    product: "dev.jhale.todoisthabitsync.theme.material.orange",
  },
  "material/yellow": {
    entitlement: "theme.material.yellow",
    product: "dev.jhale.todoisthabitsync.theme.material.yellow",
  },
  "material/green": {
    entitlement: "theme.material.green",
    product: "dev.jhale.todoisthabitsync.theme.material.green",
  },
  "material/blue": {
    entitlement: "theme.material.blue",
    product: "dev.jhale.todoisthabitsync.theme.material.blue",
  },
  "material/cyan": {
    entitlement: "theme.material.cyan",
    product: "dev.jhale.todoisthabitsync.theme.material.cyan",
  },
  "material/pink": {
    entitlement: "theme.material.pink",
    product: "dev.jhale.todoisthabitsync.theme.material.pink",
  },
}
