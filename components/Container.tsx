import { SafeAreaView, View } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
};

const styles = {
  container: { flex: 1, margin: 6, backgroundColor: 'white' }, // Ensure white background fills
  inner: { flex: 1 }, // Add bottom padding for safe area
};
