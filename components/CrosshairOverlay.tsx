import { View, StyleSheet } from 'react-native';

const CrosshairOverlay = () => {
  return (
    <View style={styles.overlayContainer}>
      {/* Top Left */}
      <View style={[styles.corner, styles.topLeft]} />
      {/* Top Right */}
      <View style={[styles.corner, styles.topRight]} />
      {/* Bottom Left */}
      <View style={[styles.corner, styles.bottomLeft]} />
      {/* Bottom Right */}
      <View style={[styles.corner, styles.bottomRight]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: '20%', // Move up (was 30%)
    left: '15%',
    width: '70%',
    height: '40%',
  },
  corner: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderColor: 'white',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});

export default CrosshairOverlay;
