// Copyright (c) 2026 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';
import ManualSync from './ManualSync';
import History from './History';
import Themes from './Themes';
import { useApiKey } from '../values/ApiKey';
import TokenInput from './TokenInput';
import { s } from 'react-native-expressive';
import { useCallback } from 'react';

export default function Actions() {
  const { apiKey, apiKeyStore } = useApiKey();
  const setApiKey = useCallback((newKey: string) => {
    apiKeyStore.set(newKey);
  }, [apiKeyStore]);
  
  if (!apiKey) {
    return <TokenInput token={apiKey} setToken={setApiKey} />;
  } else {
    return (
      <View style={styles.actions}>
        <View style={styles.left}>
          <Themes />
        </View>
        <View style={styles.center}>
          <ManualSync onDisable={() => setApiKey('')} />
        </View>
        <View style={styles.right}>
          <History />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s.space.default,
  },
  left: { flex: 1, width: '100%', alignItems: 'flex-start' },
  center: { flex: 2, width: '100%', alignItems: 'center' },
  right: { flex: 1, width: '100%', alignItems: 'flex-end' },
});
