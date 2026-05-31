import { StyleSheet, View } from 'react-native';
import ManualSync from './ManualSync';
import History from './History';
import Themes from './Themes';
import { useApiKey } from './useStorage';
import TokenInput from './TokenInput';
import { s } from 'react-native-expressive';

export default function Actions() {
  const [token, setToken] = useApiKey();
  if (!token) {
    return <TokenInput token={token} setToken={setToken} />;
  } else {
    return (
      <View style={styles.actions}>
        <View style={styles.left}>
          <Themes />
        </View>
        <View style={styles.center}>
          <ManualSync onDisable={() => setToken('')} />
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
