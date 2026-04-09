import { StyleSheet, View } from 'react-native';
import ManualSync from './ManualSync';
import History from './History';
import Disable from './Disable';
import { useApiKey } from './useStorage';
import TokenInput from './TokenInput';

export default function Actions() {
  const [token, setToken] = useApiKey();
  if (!token) {
    return <TokenInput token={token} setToken={setToken} />;
  } else {
    return (
      <View style={styles.actions}>
        <View style={styles.left}>
          <Disable setToken={setToken} />
        </View>
        <View style={styles.center}>
          <ManualSync />
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
    gap: 8,
  },
  left: { flex: 1, width: '100%', alignItems: 'flex-start' },
  center: { flex: 2, width: '100%', alignItems: 'center' },
  right: { flex: 1, width: '100%', alignItems: 'flex-end' },
});
