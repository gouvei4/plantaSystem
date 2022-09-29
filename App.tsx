import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { LogBox, Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Updates from "expo-updates";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

LogBox.ignoreAllLogs()

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getUpdate = async () => {
    try {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    getUpdate(); 
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
