import { vi } from "vitest";
import { createMount } from "@shopify/react-testing";
import { PolarisTestProvider } from "@shopify/polaris";
import { AppBridgeContext } from "@shopify/app-bridge-react/context";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { QueryProvider } from "../components";

function createMockApp() {
  const localOrigin = "https://example.com";
  return {
    dispatch: vi.fn().mockImplementation((action) => {
      return action;
    }),
    featuresAvailable: vi.fn().mockReturnValue(Promise.resolve({})),
    getState: vi.fn().mockReturnValue(Promise.resolve({})),
    subscribe: vi.fn().mockImplementation(() => vi.fn()),
    error: vi.fn().mockImplementation(() => vi.fn()),
    localOrigin: "https://example.com",
  };
}

export const mount = createMount({
  context({ initialPath }) {
    const history = createBrowserHistory();

    if (initialPath) {
      history.push(initialPath);
    }

    return {
      history,
    };
  },
  render(element, { history }) {
    return (
      <PolarisTestProvider>
        <BrowserRouter>
          <AppBridgeContext.Provider value={createMockApp()}>
            <QueryProvider>{element}</QueryProvider>
          </AppBridgeContext.Provider>
        </BrowserRouter>
      </PolarisTestProvider>
    );
  },
});
