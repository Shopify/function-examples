import { NavigationMenu, TitleBar } from '@shopify/app-bridge-react'
import { useLocation } from 'react-router-dom'

export function TitleBarSection() {
  const { pathname } = useLocation()
  const showButtons = pathname === '/page2'

  return (
    <>
      <TitleBar
        title="App Name"
        primaryAction={
          showButtons
            ? {
                content: 'Primary action',
                onAction: () => console.log('Primary action'),
              }
            : null
        }
        secondaryActions={
          showButtons
            ? [
                {
                  content: 'Secondary action',
                  onAction: () => console.log('Secondary action'),
                },
              ]
            : []
        }
      />
      <NavigationMenu
        navigationLinks={[
          {
            label: 'Page 1',
            destination: '/',
          },
          {
            label: 'Page 2',
            destination: '/page2',
          },
        ]}
      />
    </>
  )
}
