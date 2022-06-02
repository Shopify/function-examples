import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Provider } from '@shopify/app-bridge-react'

const APPBRIDGE_HOST = new URLSearchParams(location.search).get('host')

/**
 * A component to configure App Bridge.
 * @desc A thin wrapper around AppBridgeProvider that provides the following capabilities:
 *
 * 1. Ensures that navigating inside the app updates the host URL.
 * 2. Configures the App Bridge Provider, which unlocks functionality provided by the host.
 *
 * See: https://shopify.dev/apps/tools/app-bridge/react-components
 */
export function AppBridgeProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const history = useMemo(
    () => ({
      replace: (path) => {
        navigate(path, { replace: true })
      },
    }),
    [navigate]
  )

  const routerConfig = useMemo(
    () => ({ history, location }),
    [history, location]
  )

  return (
    <Provider
      config={{
        apiKey: process.env.SHOPIFY_API_KEY,
        host: APPBRIDGE_HOST,
        forceRedirect: true,
      }}
      router={routerConfig}
    >
      {children}
    </Provider>
  )
}
