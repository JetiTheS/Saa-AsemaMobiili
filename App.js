import { PaperProvider } from 'react-native-paper';
import { Homepage } from './screens/Homepage';

//options={{ headerShown: false }}
export default function App() {
  return (
    <PaperProvider>
      <Homepage />
    </PaperProvider >
  );
}