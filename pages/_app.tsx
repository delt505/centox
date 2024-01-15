import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import '../styles/globals.css';
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

// DaysJS
import dayjs from 'dayjs';

require("dayjs/locale/en");

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.locale("en");


import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import Meta from '../components/elements/Meta';

// Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withNormalizeCSS emotionOptions={{ key: 'centox' }}>
        <NotificationsProvider position='top-right'>
          <Meta/>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
    )
}

import nextI18nConfig from '../next-i18next.config';

export default appWithTranslation(MyApp, nextI18nConfig)
