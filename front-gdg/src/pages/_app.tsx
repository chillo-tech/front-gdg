import ApplicationContextWrapper from 'context/ApplicationContext';
import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 3600000, //1jour
        cacheTime: 3600000, //1jour
      },
      mutations: {
        
      }
    }
  });

  return (
    <>
      <ApplicationContextWrapper>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ApplicationContextWrapper>
    </>
  )
}
