import { BrowserRouter } from 'react-router-dom';
import { AppProvider as PolarisProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

import { AppBridgeProvider } from './components/providers/AppBridgeProvider';
import { AppProvider as DiscountsProvider } from '@shopify/discount-app-components-internal';
import { GraphQLProvider } from './components/providers/GraphQLProvider';
import Routes from './Routes';
import '@shopify/discount-app-components-internal/build/esm/styles.css';

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // .test.tsx or .test.jsx will be ignored
  // [id] can be used to match dynamic paths, e.g: /blog/[id].jsx
  // [..catchAll] will match all routes that don't match any files in /pages
  const pages = import.meta.globEager('./pages/**/!(*.test.[jt]sx)*.([jt]sx)');

  return (
    <PolarisProvider i18n={translations}>
      <BrowserRouter>
        <DiscountsProvider locale="en-US" ianaTimezone="America/Los_Angeles">
          <AppBridgeProvider>
            <GraphQLProvider>
              <Routes pages={pages} />
            </GraphQLProvider>
          </AppBridgeProvider>
        </DiscountsProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
