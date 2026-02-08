declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number>) => void;
    };
  }
}

function track(event: string, data?: Record<string, string | number>) {
  window.umami?.track(event, data);
}

export const analytics = {
  locationShared: () => track('location-shared'),
  orderSubmitted: (order: string) => track('order-submitted', { order }),
  modeSelected: (mode: string) => track('mode-selected', { mode }),
  resultShown: (shopId: string) => track('result-shown', { shopId }),
  navigateClicked: (shopId: string) => track('navigate-clicked', { shopId }),
  tryAgain: () => track('try-again'),
};
