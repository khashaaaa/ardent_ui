import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

export default function App({ Component, pageProps }: AppProps) {

  let persistor = persistStore(store)

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </MantineProvider>
    </>
  );
}