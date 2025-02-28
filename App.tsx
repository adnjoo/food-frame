import { Container } from 'components/Container';
import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';

export default function App() {
  return (
    <Container>
      <ScreenContent title="Food Tracker AI" path="App.tsx" />
      <StatusBar style="auto" />
    </Container>
  );
}
