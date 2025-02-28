import { SafeAreaView, View } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
};

const styles = {
  container: { flex: 1, margin: 6 },
  inner: { flex: 1 }, // Ensures children fill available space
};
