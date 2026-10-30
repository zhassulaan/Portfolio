export type AnalyticsEvent =
  | 'CV Download'
  | 'CV Open'
  | 'Booking Click'
  | 'Email Click'
  | 'Email Copy';

export function useAnalytics() {
  // No-op on the server and when the script is off or blocked.
  function track(event: AnalyticsEvent, props?: Record<string, string | number | boolean>) {
    if (typeof window == 'undefined' || typeof window.plausible != 'function') {
      return;
    }

    window.plausible(event, props ? { props } : undefined);
  }

  return { track };
}
